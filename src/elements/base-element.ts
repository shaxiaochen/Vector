import { Controller } from '../model/controller'

/**
* A basic element of the interactive ecosystem. Each element has an unique
* identifier, an update function to be defined by the user, and the ability to
* add dependencies on other elements.
*/
export abstract class BaseElement {

  /**
  * Allows for the events attatched to elements to be disabled.
  */
  static disable : boolean = false;

  /**
  * The controller manages the dependencies between elements. Every element
  * is added to this controller upon creation.
  */
  static controller : Controller = new Controller();

  /**
  * This number uniquely identifes elements
  */
  static count : number = 0;

  /**
  * A unique identifier string
  */
  private _id : string;

  /**
  * The update function describes how this element should update itself
  */
  update : () => void;

  /**
  * Constructs the elements and adds it into the current controller.
  */
  constructor() {

    // give this element an unique id
    this._id = `${this.constructor.name.toLowerCase()}-${BaseElement.count++}`;

    // add this element to the controller
    BaseElement.controller.add(this);

    // initialize update function
    this.update = () => {};

  }

  /**
  * Clears the static data structures holding elements and resets the count.
  */
  static clear( disable = false ) {
    BaseElement.count = 0;
    BaseElement.controller.clear();
    BaseElement.disable = disable;
  }

  /**
  * Returns the unique generated identifier associated with this element.
  */
  get id() : string {
    return this._id;
  }

  /**
  * Removes this element from the DOM and from the Element controller.
  */
  remove() {
    BaseElement.controller.remove(this);
  }

  /**
  * Declares this element dependent on the provided element(s).
  */
  addDependency( ... elements: BaseElement[] ) {
    for (let element of elements) {
      BaseElement.controller.dependencyGraph.addDependency( element, this);
    }
  }

  /**
  * Updates all of the elements that depend on this element.
  */
  updateDependents() {
    BaseElement.controller.update(this);
  }
}
