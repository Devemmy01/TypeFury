import { TextContent } from "../types";
import { QuoteAPI, LoremAPI, WikiAPI, WordsAPI, CodeAPI } from "./api";

export class ContentManager {
  private static instance: ContentManager;
  private readonly fallbackContent: Record<
    TextContent["difficulty"],
    Record<"quotes" | "programming" | "literature" | "news", TextContent[]>
  > = {
    easy: {
      quotes: [
        {
          id: crypto.randomUUID(),
          category: "quotes",
          difficulty: "easy",
          content: "Stay hungry, stay foolish.",
          author: "Steve Jobs",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "quotes",
          difficulty: "easy",
          content: "Simplicity is the ultimate sophistication.",
          author: "Leonardo da Vinci",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "quotes",
          difficulty: "easy",
          content: "The best way to predict the future is to create it.",
          author: "Peter Drucker",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "quotes",
          difficulty: "easy",
          content: "Innovation distinguishes between a leader and a follower.",
          author: "Steve Jobs",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "quotes",
          difficulty: "easy",
          content:
            "The only limit to our realization of tomorrow is our doubts of today.",
          author: "Franklin D. Roosevelt",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "quotes",
          difficulty: "easy",
          content:
            "The best time to plant a tree was 20 years ago. The second best time is now.",
          author: "Chinese Proverb",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "quotes",
          difficulty: "easy",
          content: "Be the change you wish to see in the world.",
          author: "Mahatma Gandhi",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "quotes",
          difficulty: "easy",
          content: "Life is what happens when you're busy making other plans.",
          author: "John Lennon",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "quotes",
          difficulty: "easy",
          content: "The only way to do great work is to love what you do.",
          author: "Steve Jobs",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "quotes",
          difficulty: "easy",
          content:
            "Everything you've ever wanted is on the other side of fear.",
          author: "George Addair",
          source: "Fallback Content",
        },
      ],
      programming: [
        {
          id: crypto.randomUUID(),
          category: "programming",
          difficulty: "easy",
          content: "function greet(name) { return `Hello, ${name}!`; }",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "programming",
          difficulty: "easy",
          content: "const sum = (a, b) => a + b;",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "programming",
          difficulty: "easy",
          content: "class Calculator { add(a, b) { return a + b; } }",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "programming",
          difficulty: "easy",
          content:
            "const numbers = [1, 2, 3, 4, 5]; const doubled = numbers.map(n => n * 2);",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "programming",
          difficulty: "easy",
          content: "if (user.isLoggedIn) { console.log('Welcome back!'); }",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "programming",
          difficulty: "easy",
          content: "const isEven = n => n % 2 === 0;",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "programming",
          difficulty: "easy",
          content:
            "const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "programming",
          difficulty: "easy",
          content: "const reverse = str => str.split('').reverse().join('');",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "programming",
          difficulty: "easy",
          content: "const factorial = n => n <= 1 ? 1 : n * factorial(n - 1);",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "programming",
          difficulty: "easy",
          content:
            "const fibonacci = n => n <= 1 ? n : fibonacci(n - 1) + fibonacci(n - 2);",
          source: "Fallback Content",
        },
      ],
      literature: [
        {
          id: crypto.randomUUID(),
          category: "literature",
          difficulty: "easy",
          content: "Call me Ishmael.",
          author: "Herman Melville",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "literature",
          difficulty: "easy",
          content: "It was a pleasure to burn.",
          author: "Ray Bradbury",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "literature",
          difficulty: "easy",
          content: "The only way to do great work is to love what you do.",
          author: "Steve Jobs",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "literature",
          difficulty: "easy",
          content: "In a hole in the ground there lived a hobbit.",
          author: "J.R.R. Tolkien",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "literature",
          difficulty: "easy",
          content: "The early bird catches the worm.",
          author: "English Proverb",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "literature",
          difficulty: "easy",
          content: "To be, or not to be, that is the question.",
          author: "William Shakespeare",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "literature",
          difficulty: "easy",
          content: "All that glitters is not gold.",
          author: "William Shakespeare",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "literature",
          difficulty: "easy",
          content: "The journey of a thousand miles begins with one step.",
          author: "Lao Tzu",
          source: "Fallback Content",
        },
      ],
      news: [
        {
          id: crypto.randomUUID(),
          category: "news",
          difficulty: "easy",
          content:
            "Local community garden project yields record harvest this season.",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "news",
          difficulty: "easy",
          content:
            "New study shows benefits of daily exercise for mental health.",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "news",
          difficulty: "easy",
          content:
            "City announces plans for new public library in downtown area.",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "news",
          difficulty: "easy",
          content:
            "Local school wins regional science competition for third year.",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "news",
          difficulty: "easy",
          content:
            "Community center hosts successful summer program for youth.",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "news",
          difficulty: "easy",
          content:
            "Local farmers market expands to include organic produce section.",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "news",
          difficulty: "easy",
          content:
            "New bike lanes installed in downtown area to promote cycling.",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "news",
          difficulty: "easy",
          content: "Public library extends hours to accommodate more readers.",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "news",
          difficulty: "easy",
          content: "Community center launches free coding classes for youth.",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "news",
          difficulty: "easy",
          content: "Local bakery wins award for best sourdough bread.",
          source: "Fallback Content",
        },
      ],
    },
    medium: {
      quotes: [
        {
          id: crypto.randomUUID(),
          category: "quotes",
          difficulty: "medium",
          content:
            "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.",
          author: "Steve Jobs",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "quotes",
          difficulty: "medium",
          content:
            "Success is not final, failure is not fatal: it is the courage to continue that counts.",
          author: "Winston Churchill",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "quotes",
          difficulty: "medium",
          content:
            "The future belongs to those who believe in the beauty of their dreams.",
          author: "Eleanor Roosevelt",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "quotes",
          difficulty: "medium",
          content:
            "It does not matter how slowly you go as long as you do not stop.",
          author: "Confucius",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "quotes",
          difficulty: "medium",
          content:
            "The greatest glory in living lies not in never falling, but in rising every time we fall.",
          author: "Nelson Mandela",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "quotes",
          difficulty: "medium",
          content:
            "The future belongs to those who believe in the beauty of their dreams. The only way to do great work is to love what you do. If you haven't found it yet, keep looking.",
          author: "Eleanor Roosevelt & Steve Jobs",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "quotes",
          difficulty: "medium",
          content:
            "Success is not final, failure is not fatal: it is the courage to continue that counts. The greatest glory in living lies not in never falling, but in rising every time we fall.",
          author: "Winston Churchill & Nelson Mandela",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "quotes",
          difficulty: "medium",
          content:
            "The journey of a thousand miles begins with one step. It does not matter how slowly you go as long as you do not stop. The future belongs to those who believe in the beauty of their dreams.",
          author: "Lao Tzu & Confucius & Eleanor Roosevelt",
          source: "Fallback Content",
        },
      ],
      programming: [
        {
          id: crypto.randomUUID(),
          category: "programming",
          difficulty: "medium",
          content:
            "function debounce(fn, delay) { let timer; return function(...args) { clearTimeout(timer); timer = setTimeout(() => fn.apply(this, args), delay); }; }",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "programming",
          difficulty: "medium",
          content:
            "class BinarySearchTree { constructor() { this.root = null; } insert(value) { const newNode = new Node(value); if (!this.root) { this.root = newNode; return; } let current = this.root; while (true) { if (value < current.value) { if (!current.left) { current.left = newNode; return; } current = current.left; } else { if (!current.right) { current.right = newNode; return; } current = current.right; } } } }",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "programming",
          difficulty: "medium",
          content:
            "const quickSort = (arr) => { if (arr.length <= 1) return arr; const pivot = arr[arr.length - 1]; const left = []; const right = []; for (let i = 0; i < arr.length - 1; i++) { if (arr[i] < pivot) left.push(arr[i]); else right.push(arr[i]); } return [...quickSort(left), pivot, ...quickSort(right)]; };",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "programming",
          difficulty: "medium",
          content:
            "async function fetchUserData(userId) { try { const response = await fetch(`/api/users/${userId}`); if (!response.ok) throw new Error('User not found'); const data = await response.json(); return { ...data, lastFetched: new Date() }; } catch (error) { console.error('Error fetching user:', error); throw error; } }",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "programming",
          difficulty: "medium",
          content:
            "const memoize = (fn) => { const cache = new Map(); return (...args) => { const key = JSON.stringify(args); if (cache.has(key)) return cache.get(key); const result = fn.apply(this, args); cache.set(key, result); return result; }; };",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "programming",
          difficulty: "medium",
          content:
            "class EventEmitter { constructor() { this.events = {}; } on(event, callback) { if (!this.events[event]) this.events[event] = []; this.events[event].push(callback); } emit(event, ...args) { if (this.events[event]) this.events[event].forEach(cb => cb(...args)); } }",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "programming",
          difficulty: "medium",
          content:
            "const throttle = (fn, limit) => { let inThrottle; return function(...args) { if (!inThrottle) { fn.apply(this, args); inThrottle = true; setTimeout(() => inThrottle = false, limit); } }; };",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "programming",
          difficulty: "medium",
          content:
            "class Stack { constructor() { this.items = []; } push(item) { this.items.push(item); } pop() { return this.items.pop(); } peek() { return this.items[this.items.length - 1]; } isEmpty() { return this.items.length === 0; } }",
          source: "Fallback Content",
        },
      ],
      literature: [
        {
          id: crypto.randomUUID(),
          category: "literature",
          difficulty: "medium",
          content:
            "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity.",
          author: "Charles Dickens",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "literature",
          difficulty: "medium",
          content:
            "The only way to deal with an unfree world is to become so absolutely free that your very existence is an act of rebellion.",
          author: "Albert Camus",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "literature",
          difficulty: "medium",
          content:
            "It is our choices that show what we truly are, far more than our abilities.",
          author: "J.K. Rowling",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "literature",
          difficulty: "medium",
          content:
            "The only thing necessary for the triumph of evil is for good men to do nothing.",
          author: "Edmund Burke",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "literature",
          difficulty: "medium",
          content: "The journey of a thousand miles begins with one step.",
          author: "Lao Tzu",
          source: "Fallback Content",
        },
      ],
      news: [
        {
          id: crypto.randomUUID(),
          category: "news",
          difficulty: "medium",
          content:
            "In a groundbreaking development, scientists have discovered a new species of bird in the Amazon rainforest, highlighting the region's rich biodiversity and the importance of conservation efforts.",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "news",
          difficulty: "medium",
          content:
            "Local tech startup secures $5 million in funding to develop innovative renewable energy solutions, promising to revolutionize how communities access and store solar power.",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "news",
          difficulty: "medium",
          content:
            "City council approves ambitious urban renewal project, including new parks, bike lanes, and community centers, aimed at improving quality of life for residents.",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "news",
          difficulty: "medium",
          content:
            "New study reveals significant improvements in student performance following implementation of innovative teaching methods in local schools.",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "news",
          difficulty: "medium",
          content:
            "Community initiative to reduce food waste sees remarkable success, with local restaurants and grocery stores donating over 10,000 meals to those in need.",
          source: "Fallback Content",
        },
      ],
    },
    hard: {
      quotes: [
        {
          id: crypto.randomUUID(),
          category: "quotes",
          difficulty: "hard",
          content:
            "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful. The journey of a thousand miles begins with one step. Perseverance is not a long race; it is many short races one after the other.",
          author: "Albert Schweitzer & Lao Tzu",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "quotes",
          difficulty: "hard",
          content:
            "The greatest glory in living lies not in never falling, but in rising every time we fall. The future belongs to those who believe in the beauty of their dreams. It does not matter how slowly you go as long as you do not stop. The only way to do great work is to love what you do.",
          author: "Nelson Mandela & Eleanor Roosevelt & Confucius & Steve Jobs",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "quotes",
          difficulty: "hard",
          content:
            "Innovation distinguishes between a leader and a follower. The best way to predict the future is to create it. Success is not final, failure is not fatal: it is the courage to continue that counts. The only limit to our realization of tomorrow is our doubts of today.",
          author:
            "Steve Jobs & Peter Drucker & Winston Churchill & Franklin D. Roosevelt",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "quotes",
          difficulty: "hard",
          content:
            "The journey of a thousand miles begins with one step. The future belongs to those who believe in the beauty of their dreams. It does not matter how slowly you go as long as you do not stop. The greatest glory in living lies not in never falling, but in rising every time we fall.",
          author: "Lao Tzu & Eleanor Roosevelt & Confucius & Nelson Mandela",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "quotes",
          difficulty: "hard",
          content:
            "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful. The only way to do great work is to love what you do. Innovation distinguishes between a leader and a follower.",
          author: "Albert Schweitzer & Steve Jobs",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "quotes",
          difficulty: "hard",
          content:
            "The greatest glory in living lies not in never falling, but in rising every time we fall. The future belongs to those who believe in the beauty of their dreams. It does not matter how slowly you go as long as you do not stop. The only way to do great work is to love what you do. Innovation distinguishes between a leader and a follower.",
          author: "Nelson Mandela & Eleanor Roosevelt & Confucius & Steve Jobs",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "quotes",
          difficulty: "hard",
          content:
            "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful. The journey of a thousand miles begins with one step. Perseverance is not a long race; it is many short races one after the other. The only limit to our realization of tomorrow is our doubts of today.",
          author: "Albert Schweitzer & Lao Tzu & Franklin D. Roosevelt",
          source: "Fallback Content",
        },
      ],
      programming: [
        {
          id: crypto.randomUUID(),
          category: "programming",
          difficulty: "hard",
          content:
            "class RedBlackTree { constructor() { this.root = null; } insert(value) { const node = new Node(value); if (!this.root) { this.root = node; node.color = 'black'; return; } let current = this.root; while (true) { if (value < current.value) { if (!current.left) { current.left = node; node.parent = current; break; } current = current.left; } else { if (!current.right) { current.right = node; node.parent = current; break; } current = current.right; } } this.fixViolations(node); } fixViolations(node) { while (node !== this.root && node.parent.color === 'red') { if (node.parent === node.parent.parent.left) { const uncle = node.parent.parent.right; if (uncle && uncle.color === 'red') { node.parent.color = 'black'; uncle.color = 'black'; node.parent.parent.color = 'red'; node = node.parent.parent; } else { if (node === node.parent.right) { node = node.parent; this.rotateLeft(node); } node.parent.color = 'black'; node.parent.parent.color = 'red'; this.rotateRight(node.parent.parent); } } else { const uncle = node.parent.parent.left; if (uncle && uncle.color === 'red') { node.parent.color = 'black'; uncle.color = 'black'; node.parent.parent.color = 'red'; node = node.parent.parent; } else { if (node === node.parent.left) { node = node.parent; this.rotateRight(node); } node.parent.color = 'black'; node.parent.parent.color = 'red'; this.rotateLeft(node.parent.parent); } } } this.root.color = 'black'; } }",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "programming",
          difficulty: "hard",
          content:
            "async function* asyncGenerator() { const promises = []; for (let i = 0; i < 5; i++) { promises.push(new Promise(resolve => setTimeout(() => resolve(i), 1000 * i))); } for (const promise of promises) { yield await promise; } } const memoizeWithTTL = (fn, ttl) => { const cache = new Map(); const timestamps = new Map(); return async (...args) => { const key = JSON.stringify(args); const now = Date.now(); if (cache.has(key) && now - timestamps.get(key) < ttl) { return cache.get(key); } const result = await fn.apply(this, args); cache.set(key, result); timestamps.set(key, now); return result; }; };",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "programming",
          difficulty: "hard",
          content:
            "class Observable { constructor() { this.observers = new Set(); } subscribe(observer) { this.observers.add(observer); return { unsubscribe: () => this.observers.delete(observer) }; } next(value) { this.observers.forEach(observer => observer.next(value)); } error(error) { this.observers.forEach(observer => observer.error?.(error)); } complete() { this.observers.forEach(observer => observer.complete?.()); } } class Subject extends Observable { constructor() { super(); this.value = null; } next(value) { this.value = value; super.next(value); } }",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "programming",
          difficulty: "hard",
          content:
            "const createVirtualDOM = (type, props, ...children) => ({ type, props: { ...props, children: children.flat().map(child => typeof child === 'object' ? child : createTextElement(child)) } }); const createTextElement = text => ({ type: 'TEXT_ELEMENT', props: { nodeValue: text, children: [] } }); const render = (element, container) => { const dom = element.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(element.type); Object.keys(element.props).filter(key => key !== 'children').forEach(name => { dom[name] = element.props[name]; }); element.props.children.forEach(child => render(child, dom)); container.appendChild(dom); };",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "programming",
          difficulty: "hard",
          content:
            "class LRUCache { constructor(capacity) { this.capacity = capacity; this.cache = new Map(); this.head = new Node(); this.tail = new Node(); this.head.next = this.tail; this.tail.prev = this.head; } get(key) { if (!this.cache.has(key)) return -1; const node = this.cache.get(key); this.moveToFront(node); return node.value; } put(key, value) { if (this.cache.has(key)) { const node = this.cache.get(key); node.value = value; this.moveToFront(node); } else { const node = new Node(key, value); this.cache.set(key, node); this.addToFront(node); if (this.cache.size > this.capacity) { const last = this.tail.prev; this.removeNode(last); this.cache.delete(last.key); } } } moveToFront(node) { this.removeNode(node); this.addToFront(node); } addToFront(node) { node.next = this.head.next; node.prev = this.head; this.head.next.prev = node; this.head.next = node; } removeNode(node) { node.prev.next = node.next; node.next.prev = node.prev; } }",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "programming",
          difficulty: "hard",
          content:
            "class PromisePool { constructor(maxConcurrent) { this.maxConcurrent = maxConcurrent; this.running = 0; this.queue = []; } async add(fn) { if (this.running >= this.maxConcurrent) await new Promise(resolve => this.queue.push(resolve)); this.running++; try { return await fn(); } finally { this.running--; if (this.queue.length > 0) this.queue.shift()(); } } }",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "programming",
          difficulty: "hard",
          content:
            "class CircularBuffer { constructor(capacity) { this.capacity = capacity; this.buffer = new Array(capacity); this.head = 0; this.tail = 0; this.size = 0; } push(item) { this.buffer[this.tail] = item; this.tail = (this.tail + 1) % this.capacity; if (this.size === this.capacity) this.head = (this.head + 1) % this.capacity; else this.size++; } pop() { if (this.size === 0) return null; const item = this.buffer[this.head]; this.head = (this.head + 1) % this.capacity; this.size--; return item; } }",
          source: "Fallback Content",
        },
      ],
      literature: [
        {
          id: crypto.randomUUID(),
          category: "literature",
          difficulty: "hard",
          content:
            "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife. However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters.",
          author: "Jane Austen",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "literature",
          difficulty: "hard",
          content:
            "The only way to deal with an unfree world is to become so absolutely free that your very existence is an act of rebellion. The struggle itself towards the heights is enough to fill a man's heart. One must imagine Sisyphus happy.",
          author: "Albert Camus",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "literature",
          difficulty: "hard",
          content:
            "It is our choices that show what we truly are, far more than our abilities. Happiness can be found even in the darkest of times, if one only remembers to turn on the light. The truth is a beautiful and terrible thing, and should therefore be treated with great caution.",
          author: "J.K. Rowling",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "literature",
          difficulty: "hard",
          content:
            "The only thing necessary for the triumph of evil is for good men to do nothing. Those who don't know history are doomed to repeat it. The greater the power, the more dangerous the abuse.",
          author: "Edmund Burke",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "literature",
          difficulty: "hard",
          content:
            "The journey of a thousand miles begins with one step. A journey of a thousand miles begins with a single step. The wise man does not lay up his own treasures. The more he gives to others, the more he has for his own.",
          author: "Lao Tzu",
          source: "Fallback Content",
        },
      ],
      news: [
        {
          id: crypto.randomUUID(),
          category: "news",
          difficulty: "hard",
          content:
            "In a groundbreaking development, international researchers have unveiled a new technology that promises to revolutionize renewable energy production, potentially reducing global carbon emissions by 40% over the next decade. The innovative system combines advanced solar panel technology with novel energy storage solutions, addressing one of the biggest challenges in renewable energy adoption.",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "news",
          difficulty: "hard",
          content:
            "A comprehensive study conducted by leading universities across five continents has revealed significant correlations between urban planning policies and public health outcomes. The research, spanning over a decade and involving more than 100,000 participants, suggests that cities implementing green space initiatives and pedestrian-friendly infrastructure have seen remarkable improvements in residents' physical and mental well-being.",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "news",
          difficulty: "hard",
          content:
            "Global technology leaders have announced a collaborative initiative to address the digital divide, pledging $1 billion in resources and expertise to bring high-speed internet access to underserved communities worldwide. The project, which combines satellite technology with ground-based infrastructure, aims to connect over 100 million people in remote areas within the next five years.",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "news",
          difficulty: "hard",
          content:
            "A revolutionary approach to education, combining artificial intelligence with personalized learning techniques, has shown unprecedented success in pilot programs across diverse school districts. The innovative system, which adapts to individual student needs and learning styles, has resulted in a 35% improvement in test scores and a significant reduction in achievement gaps between different socioeconomic groups.",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "news",
          difficulty: "hard",
          content:
            "An international coalition of environmental organizations has launched an ambitious conservation project aimed at protecting endangered species and their habitats. The initiative, which combines traditional conservation methods with cutting-edge technology, has already secured protected status for over 1 million acres of critical wildlife habitat and implemented successful breeding programs for several threatened species.",
          source: "Fallback Content",
        },
      ],
    },
  };

  private constructor() {}

  static getInstance(): ContentManager {
    if (!ContentManager.instance) {
      ContentManager.instance = new ContentManager();
    }
    return ContentManager.instance;
  }

  private shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  private getFallbackContent(
    category: string,
    difficulty: TextContent["difficulty"]
  ): TextContent {
    const validCategories = [
      "quotes",
      "programming",
      "literature",
      "news",
    ] as const;
    const categoryKey = validCategories.includes(category as any)
      ? (category as (typeof validCategories)[number])
      : "quotes";

    const contentArray = this.fallbackContent[difficulty][categoryKey];
    const shuffledContent = this.shuffleArray(contentArray);
    return shuffledContent[0];
  }

  async getContent(
    category: string,
    difficulty: TextContent["difficulty"] = "medium"
  ): Promise<TextContent> {
    return this.getFallbackContent(category, difficulty);
  }
}

export const contentManager = ContentManager.getInstance();
