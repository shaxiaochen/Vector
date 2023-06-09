/*
* Author: Kurt Bruns
* Date: 2020 12 05
*/

/**
* A node class contains data and a recursive next point.
*/
class Node<T> {

  /**
  * Pointer to the next node in the list
  */
  next : Node<T>;

  /**
  * Internal type
  */
  data: T;

  /**
  Constructs a new node with the provided data and sets next to be null.
  */
  constructor( data: T) {
    this.data = data;
    this.next = null;
  }

  /**
  * Returns the string representation of the data.
  */
  toString() : string {
    return this.data.toString();
  }
}

/**
* A dynamic, singlely linked list.
*/
export class LinkedList<T> implements Iterable<T> {
  
  // Contains head of linked list
  private head: Node<T>;

  /**
   * The number of elements within the linked list
   */
  private count: number;

  /**
  Consstructs an empty linked list.
  */
  constructor() {
    this.head = null;
    this.count = 0;
  }

  /**
  Inserts a node at the beginning of the list
  */
  insert( element:T ) {
    if( this.head == null ) {
      this.head = new Node(element);
    } else {
      let temp = this.head;
      this.head = new Node(element);
      this.head.next = temp;
    }
    this.count++;
  }

  /**
  Returns the first element in the list, or null if the list is empty.
  */
  first() : T {
    if( this.head != null) {
      return this.head.data;
    } else {
      return null;
    }
  }

  /**
  * Removes the first element in the list. Returns true if element was successfully removed, 
  * false otherwise.
  */
  remove() : boolean {
    if( this.head != null ) {
      this.head = this.head.next;
      this.count--;
      return true;
    } else {
      return false;
    }
  }

  /**
   * Returns the number of elements contained within the linked list.
   */
  size() : number {
    return this.count;
  }

  /**
  * Prints out the string reprsentation of this linked list.
  */
  toString() : string {
    let current = this.head;
    let str = '';
    while( current != null) {
      str += current.toString() + ' ';
      current = current.next;
    }
    return str.substr(0, str.length - 1);
  }

  /**
  Returns an iterator over the elements in the list
  */
  [Symbol.iterator](): Iterator<T> {
    let current = this.head;

    const iterator = {
      next() {
        if( current == null) {
          return {
            done: true,
            value: undefined
          }
        } else {
          let data = current.data;
          current = current.next;
          return {
            done: false,
            value: data
          }
        }
      }
    }

    return iterator;
  }
}