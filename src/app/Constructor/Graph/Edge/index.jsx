// @flow
/*
This component renders standalone edge.
*/
import * as d3 from 'd3';
import classNames from 'classnames';
import React from 'react';
import { intersect, shape } from 'svg-intersections';
import { Point2D, Matrix2D } from 'kld-affine';
import { Intersection } from 'kld-intersections';

import type {
  IEdge,
  IEdgeProps,
} from './types';

export class Edge extends React.Component<IEdgeProps> {
  constructor(props: IEdgeProps) {
    super(props);
    this.edgeOverlayRef = React.createRef();
  }

  static defaultProps = {
    edgeHandleSize: 50,
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
  static calculateAngle(pt1: any, pt2: any) {
    const xComp = (pt2.x || 0) - (pt1.x || 0);
    const yComp = (pt2.y || 0) - (pt1.y || 0);

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
    return d3
      .line()
      .x((d: any) => d.x)
      .y((d: any) => d.y)(srcTrgDataArray);
  }

  /**
   *
   *
   * @static
   * @param {(HTMLDivElement | HTMLDocument)} [viewWrapperElem=document]
   * @returns
   * @memberof Edge
   *
   * Finds the arrow in the view wrapper element
   * and returns rects of arrow.
   */
  static getArrowSize(viewWrapperElem: HTMLDivElement | HTMLDocument = document) {
    const emptyRect = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };

    const defEndArrowElement: any = viewWrapperElem.querySelector('defs>marker>.arrow');
    return defEndArrowElement ? defEndArrowElement.getBoundingClientRect() : emptyRect;
  }

  /**
   *
   *
   * @static
   * @param {IEdge} edge
   * @param {(HTMLDivElement | HTMLDocument)} [viewWrapperElem=document]
   * @returns
   * @memberof Edge
   *
   * Returns the edge element from the viewWrapper.
   */
  static getEdgePathElement(
    edge: IEdge,
    viewWrapperElem: HTMLDivElement | HTMLDocument = document,
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
   * @param {boolean} includesArrow
   * @param {(HTMLDivElement | HTMLDocument)} [viewWrapperElem=document]
   * @returns
   * @memberof Edge
   */
  static getRotatedRectIntersect(
    defSvgRotatedRectElement: any,
    src: any,
    trg: any,
    includesArrow: boolean,
    viewWrapperElem: HTMLDivElement | HTMLDocument = document,
  ) {
    const response = Edge.getDefaultIntersectResponse();
    const arrowSize = Edge.getArrowSize(viewWrapperElem);
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
      let arrowWidth = 0;
      let arrowHeight = 0;

      const [intersectPoint] = pathIntersect.points;
      const xIntersect = intersectPoint.x;
      const yIntersect = intersectPoint.y;
      if (xIntersect > left && xIntersect < right && yIntersect > trgY) {
        // arrow points to the bottom of the node
        arrowHeight = arrowSize.height;
      } else if (xIntersect > left && xIntersect < right && yIntersect < trgY) {
        // arrow points to the top of the node
        arrowHeight = -arrowSize.height;
      } else if (yIntersect > top && yIntersect < bottom && xIntersect < trgX) {
        // arrow points to the left of the node
        arrowWidth = -arrowSize.width;
      } else {
        // arrow points to the right of the node
        arrowWidth = arrowSize.width;
      }
      response.xOff = trgX - xIntersect - (includesArrow ? arrowWidth / 1.25 : 0);
      response.yOff = trgY - yIntersect - (includesArrow ? arrowHeight / 1.25 : 0);
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
   * @param {boolean} [includesArrow=true]
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
    includesArrow?: boolean = true,
    viewWrapperElem: HTMLDivElement | HTMLDocument = document,
  ) {
    const response = Edge.getDefaultIntersectResponse();
    const arrowSize = Edge.getArrowSize(viewWrapperElem);
    // get the rectangular area around path
    const clientRect = defSvgPathElement.getBoundingClientRect();

    const w = clientRect.width;
    const h = clientRect.height;
    const trgX = trg.x || 0;
    const trgY = trg.y || 0;
    const srcX = src.x || 0;
    const srcY = src.y || 0;

    // calculate the positions of each corner relative to the trg position
    const top = trgY - h / 2;
    const bottom = trgY + h / 2;
    const left = trgX - w / 2;
    const right = trgX + w / 2;

    // modify the d property to add top and left to the x and y positions
    let d = defSvgPathElement.getAttribute('d');
    if (!/^M/.test(d)) {
      // doesn't look like what we expect.
      // TODO: add more use cases than simple moveTo commands
      return {};
    }

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
        x1: srcX, y1: srcY, x2: trgX, y2: trgY,
      }),
    );

    if (pathIntersect.points.length > 0) {
      let arrowWidth = 0;
      let arrowHeight = 0;
      let multiplier = 1;
      const [intersectPoint] = pathIntersect.points;
      const xIntersect = intersectPoint.x;
      const yIntersect = intersectPoint.y;
      if (xIntersect > left && xIntersect < right) {
        const yIntersectDiff = yIntersect - trgY;
        multiplier = yIntersect < trgY ? -1 : 1;

        arrowHeight = arrowSize.height * multiplier;
        // Math.min is used to find a percentage of the arrow size
        // as the arrow approaches a horizontal or vertical vector
        // Math.abs is used to force the diff to be positive,
        // because we're using a multiplier instead and Math.min would choose a large
        // negative number as the minimum, which is undesirable.
        arrowHeight *= Math.min(Math.abs(yIntersectDiff), 1);
      }
      if (yIntersect > top && yIntersect < bottom) {
        const xIntersectDiff = xIntersect - trgX;
        multiplier = xIntersect < trgX ? -1 : 1;

        arrowWidth = arrowSize.width * multiplier;
        arrowWidth *= Math.min(Math.abs(xIntersectDiff), 1);
      }

      response.xOff = trgX - xIntersect - (includesArrow ? arrowWidth / 1.25 : 0);
      response.yOff = trgY - yIntersect - (includesArrow ? arrowHeight / 1.25 : 0);

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
    includesArrow?: boolean = true,
    viewWrapperElem: HTMLDivElement | HTMLDocument = document,
  ) {
    const response = Edge.getDefaultIntersectResponse();
    const { width: arrowWidth, height: arrowHeight } = Edge.getArrowSize(viewWrapperElem);
    const clientRect = defSvgCircleElement.getBoundingClientRect();
    let parentWidth = defSvgCircleElement.parentElement.getAttribute('width');
    let parentHeight = defSvgCircleElement.parentElement.getAttribute('height');
    if (parentWidth) {
      parentWidth = parseFloat(parentWidth);
    }
    if (parentHeight) {
      parentHeight = parseFloat(parentHeight);
    }

    const w = parentWidth || clientRect.width;
    const h = parentHeight || clientRect.height;
    const trgX = trg.x || 0;
    const trgY = trg.y || 0;
    const srcX = src.x || 0;
    const srcY = src.y || 0;
    // from the center of the node to the perimeter
    const arrowOffsetDiviser = 1.25;
    const offX = w / 2 + (includesArrow ? arrowWidth / arrowOffsetDiviser : 0);
    const offY = h / 2 + (includesArrow ? arrowHeight / arrowOffsetDiviser : 0);

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
    includesArrow?: boolean = true,
    viewWrapperElem?: HTMLDivElement | HTMLDocument = document,
  ) {
    let response = Edge.getDefaultIntersectResponse();

    if (!trg.id) {
      return response;
    }

    // Note: document.getElementById is by far the fastest way to get a node.
    // compare 2.82ms for querySelector('#node-a2 use.node') vs
    // 0.31ms and 99us for document.getElementById()
    const nodeElem = document.getElementById(`node-${trg.id}`);
    if (!nodeElem) {
      return response;
    }
    const trgNode = nodeElem.querySelector('use.node');

    // the test for trgNode.getAttributeNS makes sure we really have a node
    // and not some other type of object
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
      response = {
        ...response,
        ...Edge.getRotatedRectIntersect(
          defSvgRectElement,
          src,
          trg,
          includesArrow,
          viewWrapperElem,
        ),
      };
    } else if (defSvgPathElement) {
      // it's a complex path
      response = {
        ...response,
        ...Edge.getPathIntersect(
          defSvgPathElement,
          src,
          trg,
          includesArrow,
          viewWrapperElem,
        ),
      };
    } else {
      // it's a circle or some other type
      response = {
        ...response,
        ...Edge.getCircleIntersect(
          defSvgCircleElement,
          src,
          trg,
          includesArrow,
          viewWrapperElem,
        ),
      };
    }

    return response;
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
    let pathDescription = this.getPathDescription();

    pathDescription = pathDescription.replace(/^M/, '');
    pathDescription = pathDescription.replace(/L/, ',');
    const pathDescriptionArr = pathDescription.split(',');

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

  getPathDescription() {
    const {
      sourceNode, targetNode, viewWrapperElem,
    } = this.props;

    const trgX = (targetNode && targetNode.x) ? targetNode.x : 0;
    const trgY = (targetNode && targetNode.y) ? targetNode.y : 0;
    const srcX = (sourceNode && sourceNode.x) ? sourceNode.x : 0;
    const srcY = (sourceNode && sourceNode.y) ? sourceNode.y : 0;

    // To calculate the offset for a specific node we use that node as the third parameter
    // and the accompanying node as the second parameter, representing where the line
    // comes from and where it's going to. Don't think of a line as a one-way arrow, but rather
    // a connection between two points. In this case, to obtain the offsets for the src we
    // write trg first, then src second. Vice versa to get the offsets for trg.
    const srcOff = Edge.calculateOffset(targetNode, sourceNode, false, viewWrapperElem);
    const trgOff = Edge.calculateOffset(sourceNode, targetNode, false, viewWrapperElem);

    const linePoints = [
      {
        x: srcX - srcOff.xOff,
        y: srcY - srcOff.yOff,
      },
      {
        x: trgX - trgOff.xOff,
        y: trgY - trgOff.yOff,
      },
    ];

    return Edge.lineFunction(linePoints);
  }

  edgeOverlayRef: { current: null | HTMLDivElement };

  renderHandleText(data: any) {
    return (
      <text
        className="edge-text"
        textAnchor="middle"
        alignmentBaseline="central"
        transform={`${this.getEdgeHandleTranslation()}`}
      >
        {data.handleText}
      </text>
    );
  }

  render() {
    const {
      data, edgeTypes, edgeHandleSize, viewWrapperElem, isSelected: selected,
    } = this.props;

    if (!viewWrapperElem) {
      return null;
    }

    const id = `${data.source || ''}_${data.target}`;
    const className = classNames('edge', { selected });

    return (
      <g className="edge-container" data-source={data.source} data-target={data.target}>
        <g className={className}>
          <path className="edge-path" d={this.getPathDescription() || undefined} />
          <use
            className="edge-use"
            xlinkHref={Edge.getXlinkHref(edgeTypes, data)}
            width={edgeHandleSize}
            height={edgeHandleSize}
            transform={`${this.getEdgeHandleTransformation()}`}
          />
          {/* {data.handleText && this.renderHandleText(data)} */}
        </g>
        <g className="edge-mouse-handler">
          <path
            className="edge-overlay-path"
            ref={this.edgeOverlayRef}
            id={id}
            data-source={data.source}
            data-target={data.target}
            d={this.getPathDescription() || undefined}
          />
        </g>
      </g>
    );
  }
}

export default Edge;
