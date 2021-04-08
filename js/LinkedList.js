class Node {
    #value = null;
    #prev = null;
    #next = null;

    constructor(value) {
        this.#value = value;
    }

    get value() {
        return this.#value;
    }

    get prev() {
        return this.#prev;
    }

    set prev(value) {
        this.#prev = value;
    }

    get next() {
        return this.#next;
    }

    set next(value) {
        this.#next = value;
    }
}

class LinkedList {
    #head = null;
    #tail = null;
    #length = 0;

    /**
     * добавляет элемент в начало очереди
     * @param value
     */
    addFirst(value) {
        const node = new Node(value);
        if (!this.#tail) {
            this.#head = node;
            this.#tail = node;
        } else {
            this.#tail.prev = node;
            node.next = this.#head;
            this.#head = node;
        }
        ++this.#length;
    }

    /**
     * добавляет элемент в конец очереди
     * @param value
     */
    addLast(value) {
        const node = new Node(value);
        if (!this.#tail) {
            this.#head = node;
            this.#tail = node;
        } else {
            this.#tail.next = node;
            node.prev = this.#tail;
            this.#tail = node;
        }
        ++this.#length;
    }

    /**
     * возвращает с удалением элемент из начала очереди. Если очередь пуста, генерирует исключение RangeError
     * @returns {element}
     */
    removeFirst() {
        const result = this.#head;
        if (this.#length > 1) {
            this.#head = this.#head.next;
            this.#head.prev = null;
            --this.#length;
            return result;
        } else if (this.#length === 1) {
            this.#head = null;
            this.#tail = null;
            --this.#length;
            return result;
        }
        throw new RangeError('LinkedList is empty')
    }

    /**
     * возвращает с удалением элемент из конца очереди. Если очередь пуста, генерирует исключение RangeError
     * @returns {element}
     */
    removeLast() {
        const result = this.#tail;
        if (this.#length > 1) {
            this.#tail = this.#tail.prev;
            this.#tail.next = null;
            --this.#length;
            return result;
        } else if (this.#length === 1) {
            this.#head = null;
            this.#tail = null;
            --this.#length;
            return result;
        }
        throw new RangeError('LinkedList is empty')
    }

    /**
     * возвращает без удаления элемент из головы очереди. Если очередь пуста, генерирует исключение RangeError
     * @returns {element}
     */
    getFirst() {
        if (this.#length) {
            return this.#head.value;
        }
        throw new RangeError('LinkedList is empty')
    }

    /**
     *возвращает без удаления последний элемент очереди. Если очередь пуста, генерирует исключение RangeError
     * @returns {element}
     */
    getLast() {
        if (this.#length) {
            return this.#tail.value;
        }
        throw new RangeError('LinkedList is empty')
    }

    /**
     * возвращает true, если коллекция пуста, иначе возвращает false
     * @returns {boolean}
     */
    isEmpty() {
        return !Boolean(this.#length);
    }

    /**
     * удаляет все элементы из коллекции
     */
    clear() {
        this.#head = null;
        this.#tail = null;
        this.#length = 0;
    }

    /**
     * возвращает число элементов в коллекции
     * @returns {number}
     */
    size() {
        return this.#length;
    }

    [Symbol.iterator]() {
        let current = this.#head;
        return {
            next: () => {
                const result = {
                    done: !current,
                    value: current?.value,
                };
                current = current?.next;
                return result;
            },
        };
    }
}