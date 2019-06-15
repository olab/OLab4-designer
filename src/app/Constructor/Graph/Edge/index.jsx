// @flow
/*
This component renders standalone edge.
*/
import * as d3 from 'd3';
import React from 'react';
import { intersect, shape } from 'svg-intersections';
import { Point2D, Matrix2D } from 'kld-affine';
import { Intersection } from 'kld-intersections';

import type {
  IEdgeProps, ITargetPosition, Edge as EdgeType,
} from './types';

import { BLUE_GREY } from '../../../../shared/colors';
import { getVariantValueDOM, getMinRadius } from './utils';

import { EdgeWrapper } from './styles';

export class Edge extends React.Component<IEdgeProps> {
  constructor(props: IEdgeProps) {
    super(props);
    this.edgeOverlayRef = React.createRef();
  }

  static defaultProps = {
    edgeHandleSize: 24,
  };

  /**
   *
   *
   * @static
   * @param {*} pt1
   * @param {*} pt2
   * @returns
   * @memberof Edge
   *
   * Calculates angle between 2 dots.
   */
  static calculateAngle(src: any, trg: any) {
    const xComp = (trg.x || 0) - (src.x || 0);
    const yComp = (trg.y || 0) - (src.y || 0);

    const theta = Math.atan2(yComp, xComp);
    return theta * 180 / Math.PI;
  }

  /**
   *
   *
   * @static
   * @param {*} srcTrgDataArray
   * @returns
   * @memberof Edge
   *
   * Provides API for curved lines using .curve() Example:
   * https://bl.ocks.org/d3indepth/64be9fc39a92ef074034e9a8fb29dcce
   */
  static lineFunction(srcTrgDataArray: any) {
    return d3.line()(srcTrgDataArray);
  }

  /**
   *
   *
   * @static
   * @param {EdgeType} edge
   * @param {(HTMLDivElement | HTMLDocument)} [viewWrapperElem=document]
   * @returns
   * @memberof Edge
   *
   * Returns the edge element from the viewWrapper.
   */
  static getEdgePathElement(
    edge: EdgeType,
    viewWrapperElem: HTMLDivElement,
  ) {
    return viewWrapperElem.querySelector(`#edge-${edge.source}-${edge.target}-container>.edge-container>.edge>.edge-path`);
  }

  /**
   *
   *
   * @static
   * @param {(Element | null)} edgePathElement
   * @returns
   * @memberof Edge
   *
   * If edgePathElement != null
   * converts an SVG path d property to an object with source and target objects
   * else
   * returns an object with source and target at position 0
   */
  static parsePathToXY(edgePathElement: Element | null) {
    const response = {
      source: { x: 0, y: 0 },
      target: { x: 0, y: 0 },
    };

    if (edgePathElement) {
      let d = edgePathElement.getAttribute('d');
      d = d && d.replace(/^M/, '');
      d = d && d.replace(/L/, ',');

      const dArr = (d && d.split(',')) || [];
      const [sourceX, sourceY, targetX, targetY] = dArr.map(dimension => parseFloat(dimension));

      if (dArr.length === 4) {
        response.source.x = sourceX;
        response.source.y = sourceY;
        response.target.x = targetX;
        response.target.y = targetY;
      }
    }

    return response;
  }

  /**
   *
   *
   * @static
   * @returns
   * @memberof Edge
   *
   * Returns a default intersect object.
   */
  static getDefaultIntersectResponse() {
    return {
      xOff: 0,
      yOff: 0,
      intersect: {
        type: 'none',
        point: {
          x: 0,
          y: 0,
        },
      },
    };
  }

  /**
   *
   *
   * @static
   * @param {*} defSvgRotatedRectElement
   * @param {*} src
   * @param {*} trg
   * @param {(HTMLDivElement | HTMLDocument)} [viewWrapperElem=document]
   * @returns
   * @memberof Edge
   */
  static getRotatedRectIntersect(
    defSvgRotatedRectElement: any,
    src: any,
    trg: any,
  ) {
    const response = Edge.getDefaultIntersectResponse();
    const clientRect = defSvgRotatedRectElement.getBoundingClientRect();

    const widthAttr = defSvgRotatedRectElement.getAttribute('width');
    const heightAttr = defSvgRotatedRectElement.getAttribute('height');
    const w = widthAttr ? parseFloat(widthAttr) : clientRect.width;
    const h = heightAttr ? parseFloat(heightAttr) : clientRect.height;
    const trgX = trg.x || 0;
    const trgY = trg.y || 0;
    const srcX = src.x || 0;
    const srcY = src.y || 0;

    const top = trgY - h / 2;
    const bottom = trgY + h / 2;
    const left = trgX - w / 2;
    const right = trgX + w / 2;

    const line = shape('line', {
      x1: srcX, y1: srcY, x2: trgX, y2: trgY,
    });

    // define rectangle
    const rect = {
      topLeft: new Point2D(left, top),
      bottomRight: new Point2D(right, bottom),
    };

    // convert rectangle corners to polygon (list of points)
    const poly = [
      rect.topLeft,
      new Point2D(rect.bottomRight.x, rect.topLeft.y),
      rect.bottomRight,
      new Point2D(rect.topLeft.x, rect.bottomRight.y),
    ];

    // find center point of rectangle
    const center = rect.topLeft.lerp(rect.bottomRight, 0.5);

    // get the rotation
    const transform = defSvgRotatedRectElement.getAttribute('transform');
    let rotate = transform ? transform.replace(/(rotate.[0-9]*.)|[^]/g, '$1') : null;
    let angle = 0;
    if (rotate) {
      // get the number
      rotate = rotate.replace(/^rotate\(|\)$/g, '');
      // define rotation in radians
      angle = parseFloat(rotate) * Math.PI / 180.0;
    }
    // create matrix for rotating around center of rectangle
    const rotation = Matrix2D.rotationAt(angle, center);
    // create new rotated polygon
    const rotatedPoly = poly.map(p => p.transform(rotation));

    // find intersections
    const pathIntersect = Intersection.intersectLinePolygon(
      line.params[0],
      line.params[1],
      rotatedPoly,
    );

    if (pathIntersect.points.length > 0) {
      const [intersectPoint] = pathIntersect.points;
      const xIntersect = intersectPoint.x;
      const yIntersect = intersectPoint.y;

      response.xOff = trgX - xIntersect;
      response.yOff = trgY - yIntersect;
      response.intersect = intersectPoint;
    }

    return response;
  }

  /**
   *
   *
   * @static
   * @param {*} defSvgPathElement
   * @param {*} src
   * @param {*} trg
   * @param {(HTMLDivElement | HTMLDocument)} [viewWrapperElem=document]
   * @returns
   * @memberof Edge
   *
   * Finds the path intersect.
   */
  static getPathIntersect(
    defSvgPathElement: any,
    src: any,
    trg: any,
  ) {
    const response = Edge.getDefaultIntersectResponse();
    const { width: w, height: h } = defSvgPathElement.getBoundingClientRect();

    const trgX = trg.x || 0;
    const trgY = trg.y || 0;
    const srcX = src.x || 0;
    const srcY = src.y || 0;

    // calculate the positions of each corner relative to the trg position
    const top = trgY - h / 2;
    // const bottom = trgY + h / 2;
    const left = trgX - w / 2;
    // const right = trgX + w / 2;

    // modify the d property to add top and left to the x and y positions
    let d = defSvgPathElement.getAttribute('d');
    d = d.replace(/^M /, '');

    let dArr = d.split(' ');
    dArr = dArr.map((val, index) => {
      let isEnd = false;
      if (/Z$/.test(val)) {
        val = val.replace(/Z$/, '');
        isEnd = true;
      }
      // items % 2 are x positions
      if (index % 2 === 0) {
        return (parseFloat(val) + left) + (isEnd ? 'Z' : '');
      }
      return (parseFloat(val) + top) + (isEnd ? 'Z' : '');
    });

    const pathIntersect = intersect(
      shape('path', {
        d: `M ${dArr.join(' ')}`,
      }),
      shape('line', {
        x1: srcX,
        y1: srcY,
        x2: trgX,
        y2: trgY,
      }),
    );

    if (pathIntersect.points.length > 0) {
      const [intersectPoint] = pathIntersect.points;
      const xIntersect = intersectPoint.x;
      const yIntersect = intersectPoint.y;

      response.xOff = trgX - xIntersect;
      response.yOff = trgY - yIntersect;

      response.intersect = intersectPoint;
    }

    return response;
  }

  /**
   *
   *
   * @static
   * @param {*} defSvgCircleElement
   * @param {*} src
   * @param {*} trg
   * @param {boolean} [includesArrow=true]
   * @param {(HTMLDivElement | HTMLDocument)} [viewWrapperElem=document]
   * @returns
   * @memberof Edge
   *
   * Finds the circle intersect.
   */
  static getCircleIntersect(
    defSvgCircleElement: any,
    src: any,
    trg: any,
  ) {
    const response = Edge.getDefaultIntersectResponse();
    const { width, height } = defSvgCircleElement.getBoundingClientRect();

    let parentWidth = defSvgCircleElement.parentElement.getAttribute('width');
    if (parentWidth) {
      parentWidth = parseFloat(parentWidth);
    }
    let parentHeight = defSvgCircleElement.parentElement.getAttribute('height');
    if (parentHeight) {
      parentHeight = parseFloat(parentHeight);
    }

    const w = parentWidth || width;
    const h = parentHeight || height;
    const trgX = trg.x || 0;
    const trgY = trg.y || 0;
    const srcX = src.x || 0;
    const srcY = src.y || 0;
    // from the center of the node to the perimeter
    const offX = w / 2;
    const offY = h / 2;

    // Note: even though this is a circle function, we can use ellipse
    // because all circles are ellipses but not all ellipses are circles.
    const pathIntersect = intersect(
      shape('ellipse', {
        rx: offX,
        ry: offY,
        cx: trgX,
        cy: trgY,
      }),
      shape('line', {
        x1: srcX,
        y1: srcY,
        x2: trgX,
        y2: trgY,
      }),
    );

    if (pathIntersect.points.length > 0) {
      const [intersectPoint] = pathIntersect.points;

      const xIntersect = intersectPoint.x;
      const yIntersect = intersectPoint.y;

      response.xOff = trgX - xIntersect;
      response.yOff = trgY - yIntersect;
      response.intersect = intersectPoint;
    }

    return response;
  }

  /**
   *
   *
   * @static
   * @param {*} src
   * @param {*} trg
   * @param {boolean} [includesArrow=true]
   * @param {(HTMLDivElement | HTMLDocument)} [viewWrapperElem=document]
   * @returns
   * @memberof Edge
   *
   * Returns rect intersects depending on type of svg item.
   */
  static calculateOffset(
    src: any,
    trg: any,
    viewWrapperElem: HTMLDivElement,
  ) {
    const response = Edge.getDefaultIntersectResponse();

    const nodeElem = document.getElementById(`node-${trg.id}`);
    if (!nodeElem) {
      return response;
    }

    const trgNode = nodeElem.querySelector('use.node');
    if (!trgNode || (trgNode && !trgNode.getAttributeNS)) {
      return response;
    }

    const xlinkHref = trgNode.getAttributeNS('http://www.w3.org/1999/xlink', 'href');
    if (!xlinkHref) {
      return response;
    }

    const defSvgRectElement = viewWrapperElem.querySelector(`defs>${xlinkHref} rect`);
    // Conditionally trying to select the element in other ways is faster than trying to
    // do the selection.
    const defSvgPathElement = !defSvgRectElement
      ? viewWrapperElem.querySelector(`defs>${xlinkHref} path`)
      : null;

    const defSvgCircleElement = (!defSvgRectElement && !defSvgPathElement)
      ? viewWrapperElem.querySelector(`defs>${xlinkHref} circle, defs>${xlinkHref} ellipse, defs>${xlinkHref} polygon`)
      : null;

    if (defSvgRectElement) {
      // it's a rectangle
      return {
        ...response,
        ...Edge.getRotatedRectIntersect(
          defSvgRectElement,
          src,
          trg,
        ),
      };
    }

    if (defSvgPathElement) {
      // it's a complex path
      return {
        ...response,
        ...Edge.getPathIntersect(
          defSvgPathElement,
          src,
          trg,
        ),
      };
    }

    // it's a circle or some other type
    return {
      ...response,
      ...Edge.getCircleIntersect(
        defSvgCircleElement,
        src,
        trg,
      ),
    };
  }

  /**
   *
   *
   * @static
   * @param {*} edgeTypes
   * @param {*} data
   * @returns
   * @memberof Edge
   *
   * Returns a shapeId from the edge type.
   */
  static getXlinkHref(edgeTypes: any, data: any) {
    if (data.type && edgeTypes[data.type]) {
      return edgeTypes[data.type].shapeId;
    }

    if (edgeTypes.standardEdge) {
      return edgeTypes.standardEdge.shapeId;
    }

    return null;
  }

  getEdgeHandleTranslation = () => {
    const pathDescription = this.getPathDescription();
    const pathDescriptionArr = pathDescription
      .replace(/^M/, '')
      .replace(/L/, ',')
      .split(',');

    const diffX = parseFloat(pathDescriptionArr[2]) - parseFloat(pathDescriptionArr[0]);
    const diffY = parseFloat(pathDescriptionArr[3]) - parseFloat(pathDescriptionArr[1]);
    const x = parseFloat(pathDescriptionArr[0]) + diffX / 2;
    const y = parseFloat(pathDescriptionArr[1]) + diffY / 2;

    return `translate(${x}, ${y})`;
  }

  getEdgeHandleOffsetTranslation = () => {
    const { edgeHandleSize = 0 } = this.props;
    const offset = -edgeHandleSize / 2;

    return `translate(${offset}, ${offset})`;
  }

  getEdgeHandleRotation = () => {
    const { sourceNode: src, targetNode: trg } = this.props;
    const theta = Edge.calculateAngle(src, trg);

    return `rotate(${theta})`;
  }

  getEdgeHandleTransformation = () => {
    const translation = this.getEdgeHandleTranslation();
    const rotation = this.getEdgeHandleRotation();
    const offset = this.getEdgeHandleOffsetTranslation();

    return `${translation} ${rotation} ${offset}`;
  }

  static getOffset = (
    sourceNodeXY: ITargetPosition,
    targetNodeXY: ITargetPosition,
    offset: number,
  ) => {
    const { x: sourceX, y: sourceY } = sourceNodeXY;
    const { x: targetX, y: targetY } = targetNodeXY;

    const lineLength = Math.sqrt(((targetX - sourceX) ** 2) + ((targetY - sourceY) ** 2));
    const k = offset / lineLength;

    return [
      (targetX - sourceX) * k,
      (targetY - sourceY) * k,
    ];
  }

  getPathDescription() {
    const { sourceNode = {}, targetNode = {}, hasSibling } = this.props;

    const trgX = (targetNode && targetNode.x) ? targetNode.x : 0;
    const trgY = (targetNode && targetNode.y) ? targetNode.y : 0;
    const srcX = (sourceNode && sourceNode.x) ? sourceNode.x : 0;
    const srcY = (sourceNode && sourceNode.y) ? sourceNode.y : 0;

    const minRadius = getMinRadius(sourceNode, targetNode);

    const thetaDegrees = Edge.calculateAngle(sourceNode, targetNode);
    const thetaRadians = (90 - thetaDegrees) * (Math.PI / 180);

    let linePoints;

    if (hasSibling) {
      const deltaX = -minRadius * Math.cos(thetaRadians);
      const deltaY = minRadius * Math.sin(thetaRadians);

      linePoints = [
        [
          srcX - deltaX,
          srcY - deltaY,
        ],
        [
          trgX - deltaX,
          trgY - deltaY,
        ],
      ];
    } else {
      const [srcDeltaX, srcDeltaY] = Edge.getOffset(
        { x: srcX, y: srcY },
        { x: trgX, y: trgY },
        minRadius,
      );

      const [trgDeltaX, trgDeltaY] = Edge.getOffset(
        { x: trgX, y: trgY },
        { x: srcX, y: srcY },
        minRadius,
      );

      linePoints = [
        [
          srcX + srcDeltaX,
          srcY + srcDeltaY,
        ],
        [
          trgX + trgDeltaX,
          trgY + trgDeltaY,
        ],
      ];
    }

    return Edge.lineFunction(linePoints);
  }

  edgeOverlayRef: { current: null | Element };

  render() {
    const {
      data,
      edgeTypes,
      edgeHandleSize,
      viewWrapperElem,
      isSelected: selected,
      isLinkingStarted,
    } = this.props;

    if (!viewWrapperElem) {
      return null;
    }

    const id = `${data.source || ''}_${data.target}`;

    return (
      <g className="edge-container" data-source={data.source} data-target={data.target}>
        <EdgeWrapper
          selected={selected}
          isLinkingStarted={isLinkingStarted}
        >
          <path
            stroke={data.color}
            strokeWidth={`${data.thickness}px`}
            strokeDasharray={getVariantValueDOM(data.variant)}
            d={this.getPathDescription() || undefined}
          />
          <use
            id={id}
            className="edge-use"
            ref={this.edgeOverlayRef}
            width={edgeHandleSize}
            height={edgeHandleSize}
            xlinkHref={Edge.getXlinkHref(edgeTypes, data)}
            transform={this.getEdgeHandleTransformation()}
            data-source={data.source}
            data-target={data.target}
            fill={data.color || BLUE_GREY}
          />
        </EdgeWrapper>
      </g>
    );
  }
}

export default Edge;
