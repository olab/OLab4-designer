// @flow
/*
Utils class for Graph functionality.
*/
import type { EdgeData as EdgeDataType } from '../../Edge/types';
import type { INode } from '../../Node/types';

class GraphUtils {
  /**
   *
   *
   * @static
   * @param {Array<INode>} arr
   * @returns
   * @memberof GraphUtils
   *
   * Converts an array of nodes to a hash map.
   */
  static getNodesMap(arr: Array<INode>) {
    const map = {};
    let item = null;
    for (let i = 0; i < arr.length; i += 1) {
      item = arr[i];
      map[`key-${item.id}`] = {
        children: [],
        incomingEdges: [],
        node: item,
        originalArrIndex: i,
        outgoingEdges: [],
        parents: [],
      };
    }
    return map;
  }

  /**
   *
   *
   * @static
   * @param {Array<EdgeDataType>} arr
   * @returns
   * @memberof GraphUtils
   *
   * Converts an array of edges to a hash map.
   */
  static getEdgesMap(arr: Array<EdgeDataType>) {
    const map = {};
    let item = null;
    for (let i = 0; i < arr.length; i += 1) {
      item = arr[i];
      if (item.target) {
        map[`${item.source || ''}_${item.target}`] = {
          edge: item,
          originalArrIndex: i,
        };
      }
    }
    return map;
  }

  /**
   *
   *
   * @static
   * @param {*} nodesMap
   * @param {Array<EdgeDataType>} edges
   * @memberof GraphUtils
   *
   * Not a pure method that fills various properties of a nodesMap.
   */
  static linkNodesAndEdges(nodesMap: any, edges: Array<EdgeDataType>) {
    let nodeMapSourceNode = null;
    let nodeMapTargetNode = null;
    let edge = null;
    for (let i = 0; i < edges.length; i += 1) {
      edge = edges[i];
      if (edge.target) {
        nodeMapSourceNode = nodesMap[`key-${edge.source || ''}`];
        nodeMapTargetNode = nodesMap[`key-${edge.target}`];
        // avoid an orphaned edge
        if (nodeMapSourceNode && nodeMapTargetNode) {
          nodeMapSourceNode.outgoingEdges.push(edge);
          nodeMapTargetNode.incomingEdges.push(edge);
          nodeMapSourceNode.children.push(nodeMapTargetNode);
          nodeMapTargetNode.parents.push(nodeMapSourceNode);
        }
      }
    }
  }

  /**
   *
   *
   * @static
   * @param {string} id
   * @returns
   * @memberof GraphUtils
   *
   * Removes an element from DOM using an id.
   */
  static removeElementFromDom(id: string) {
    const container = document.getElementById(id);
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
      return true;
    }
    return false;
  }

  /**
   *
   *
   * @static
   * @param {*} element
   * @param {string} selector
   * @returns
   * @memberof GraphUtils
   *
   * Returns the element if an element matches a selector.
   */
  static findParent(element: HTMLElement, selector: string) {
    if (element && element.closest) {
      return element.closest(selector);
    }

    return null;
  }

  static yieldingLoop(
    count: number,
    chunkSize: number,
    callback: Function,
    finished: Function,
  ) {
    let i = 0;
    const chunk = () => {
      const end = Math.min(i + chunkSize, count);
      for (; i < end; i += 1) {
        callback.call(null, i);
      }
      if (i < count) {
        setTimeout(chunk, 0);
      } else if (finished) {
        finished.call(null);
      }
    };

    chunk();
  }

  /**
   *
   *
   * @static
   * @param {*} prevNode
   * @param {*} newNode
   * @returns
   * @memberof GraphUtils
   *
   * Finds shallow differences in 2 objects.
   */
  static hasNodeShallowChanged(prevNode: INode, newNode: INode) {
    const prevNodeKeys = Object.keys(prevNode);
    const newNodeKeys = Object.keys(prevNode);
    const checkedKeys = {};
    for (let i = 0; i < prevNodeKeys.length; i += 1) {
      const key = prevNodeKeys[i];
      if (!{}.hasOwnProperty.call(newNode, key) || prevNode[key] !== newNode[key]) {
        return true;
      }
      checkedKeys[key] = true;
    }
    for (let i = 0; i < newNodeKeys.length; i += 1) {
      const key = newNodeKeys[i];
      if (!checkedKeys[key]) {
        if (!{}.hasOwnProperty.call(prevNode, key) || prevNode[key] !== newNode[key]) {
          return true;
        }
      }
    }
    return false;
  }
}

export default GraphUtils;
