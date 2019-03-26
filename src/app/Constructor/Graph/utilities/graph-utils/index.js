// @flow
import type { IEdge } from '../../Edge/types';
import type { INode } from '../../Node/types';

class GraphUtils {
  static getNodesMap(arr: INode[]) {
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

  static getEdgesMap(arr: IEdge[]) {
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

  static linkNodesAndEdges(nodesMap: any, edges: IEdge[]) {
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

  static removeElementFromDom(id: string) {
    const container = document.getElementById(id);
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
      return true;
    }
    return false;
  }

  static findParent(element: any, selector: string) {
    if (element && element.matches && element.matches(selector)) {
      return element;
    }

    if (element && element.parentNode) {
      return GraphUtils.findParent(element.parentNode, selector);
    }

    return null;
  }

  static yieldingLoop(count, chunkSize, callback, finished) {
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

  static hasNodeShallowChanged(prevNode, newNode) {
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
