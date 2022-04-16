/**
 * @Collection Of all required ELEMENTs to be used in XEON JS.
 * @author - CodeWithArif
 * @license - License can be found in LICENSE file.
 * @copyright - All rights resurved.
 */
import NS from './ns-list';
import chalk from '../../../utils/chalk';

var canUseDOM = !!(typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.document.createElement !== 'undefined');
const dom = window.document;
var isParent = false;



/**
 * @method - This method is used to create real elements in the document.
 * 
 * @param {String} tag
 * @param {HTMLElement} parent
 */
export default function createRealElement(tag, parent) {

      if (typeof tag !== "string") {
            chalk.error(`Invalid tag : Expect a String. But found a ${typeof tag}. \n>>>==============>>> Unwillingly ignoring it.`);
            return;
      }

      /**
       * @global
       * If parent exist then set isParent to true
       */
      isParent = !(parent === undefined);
      if (isParent) {
            if (!(parent.nodeType)) {
                  chalk.error(`Invalid parent : Expect a HTMLElement. But found a ${typeof parent}. \n>>>==============>>> Unwillingly ignoring it.`);
                  return;
            }
            isParent = parent.namespaceURI !== NS.html.namespaceURI;
      }

      var element = null, ns = null, isDeprecated = false;
      for (let [key, value] of Object.entries(NS)) {
            if (value.elements.includes(tag)) {
                  ns = key;
                  break;
            }
            if (value.deprecatedElements.includes(tag)) {
                  ns = key;
                  isDeprecated = true;
                  break;
            }
      }

      if (ns === null) {
            chalk.error(`${tag} is not a valid element.`);
            return null;
      }

      if (isDeprecated) {
            chalk.depricated.warn(`${tag} is a deprecated ${ns} element.`);
      }

      if (canUseDOM) {
            if (isParent) {
                  element = dom.createElementNS(parent.namespaceURI, tag, parent);
            } else {
                  element = dom.createElementNS(NS[ns].namespaceURI, tag);
            }
      }

      isParent = false;

      return element;
}