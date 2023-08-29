import { SelectedTrackRecord } from '../../types';

class LRULinkedListItem<K, V> {
  prev: LRULinkedListItem<K, V> | null;
  next: LRULinkedListItem<K, V> | null;
  value: V | null;
  key: K;

  constructor(
    key = null,
    value = null,
  ) {
    this.value = value;
    this.key = key;
  }
}

class LRUCache<K, V> {
  capacity: number;
  map = new Map<K, LRULinkedListItem<K, V>>();
  head: LRULinkedListItem<K, V>;
  tail: LRULinkedListItem<K, V>;


  constructor(capacity: number) {
    this.capacity = capacity;
    this.head = new LRULinkedListItem<K, V>();
    this.tail = new LRULinkedListItem<K, V>();
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }
  
  get(key: K) {
    if (this.map.has(key)) {
      // remove elem from current position
      let c = this.map.get(key);
      c.prev.next = c.next;
      c.next.prev = c.prev;

      this.tail.prev.next = c; // insert it after last element. Element before tail
      c.prev = this.tail.prev; // update c.prev and next pointer
      c.next = this.tail;
      this.tail.prev = c; // update last element as tail

      return c.value;
    } else {
      return -1; // element does not exist
    }
  }

  set(key: K, value: V) {
    if (this.get(key) !== -1) {
      // if key does not exist, update last element value
      this.tail.prev.value = value;
    } else {
      // check if map size is at capacity
      if (this.map.size === this.capacity) {
        //delete item both from map and DLL
        this.map.delete(this.head.next.key); // delete first element of list
        this.head.next = this.head.next.next; // update first element as next element
        this.head.next.prev = this.head;
      }

      const newNode = new LRULinkedListItem<K, V>(key, value);

      // when adding a new node, we need to update both map and DLL
      this.map.set(key, newNode); // add current node to map
      this.tail.prev.next = newNode; // add node to end of the list
      newNode.prev = this.tail.prev; // update prev and next pointers of newNode
      newNode.next = this.tail;
      this.tail.prev = newNode; // update last element
    }
  }
}
export const TrackStatisticsCache = new LRUCache<string, SpotifyApi.AudioFeaturesObject>(50);
export const PlaylistDataCache = new LRUCache<string, Array<SelectedTrackRecord>>(20);

export const SpotifyCache = new LRUCache<string, string>(1);
