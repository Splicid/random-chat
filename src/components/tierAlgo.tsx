class Trie {
    children: any
    isEndOfWord: boolean

    constructor() {
        this.children = {}
        this.isEndOfWord = false
    }

    insert(word: string) {
        let node = this
        for (let i = 0; i < word.length; i++) {
            if (!node.children[word[i]]) {
                node.children[word[i]] = new Trie()
            }
            node = node.children[word[i]]
        }
        node.isEndOfWord = true
    }

    search(word: string) {
        let node = this
        for (let i = 0; i < word.length; i++) {
            if (!node.children[word[i]]) {
                return false
            }
            node = node.children[word[i]]
        }
        return node.isEndOfWord
    }

    startsWith(prefix: string) {
        let node = this
        for (let i = 0; i < prefix.length; i++) {
            if (!node.children[prefix[i]]) {
                return false
            }
            node = node.children[prefix[i]]
        }
        return true
    }

    suggestions(prefix: string) {
        let node = this
        for (let i = 0; i < prefix.length; i++) {
            if (!node.children[prefix[i]]) {
                return []
            }
            node = node.children[prefix[i]]
        }
        return this.getAllWords(node, prefix)
    }

    getAllWords(node: Trie, prefix: string) {
        let results: string[] = []
        if (node.isEndOfWord) {
            results.push(prefix)
        }
        for (let child in node.children) {
            results = results.concat(this.getAllWords(node.children[child], prefix + child))
        }
        return results
    }
}

export default Trie