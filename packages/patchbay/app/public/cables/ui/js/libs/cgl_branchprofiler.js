'use strict';

class Branch
{

    /**
     * @param {string} task
     * @param {string|object} name
     * @param {object} [data]
     */
    constructor(task, name, data = null)
    {
        this.task = task;
        this.name = name;
        this.data = data;
        this.dur = 0;
        this._startTime = 0;
        this.childs = [];
    }

    start()
    {
        this._startTime = performance.now();
    }

    end()
    {
        this.dur = performance.now() - this._startTime;
    }

    push(task, name, data)
    {
        const b = new Branch(task, name, data);
        this.childs.push(b);
        b.start();
        return b;
    }

    print(level)
    {
        level = level || 0;

        for (let i = 0; i < this.childs.length; i++)
            this.childs[i].print(level + 1);
    }
}

class BranchStack
{

    start()
    {
        this.root = new Branch("Root");
        this.root.start();

        /** @type {Branch} */
        this.current = this.root;
    }

    /**
     * @param {string} task
     * @param {string} name
     * @param {any} info
     * @returns {Branch}
     */
    push(task, name, info = null)
    {
        if (!this.current) this.start();

        const prev = this.current;

        if (typeof name != "string" && info != null)
        {
            info = name;
            name = "";
        }

        this.current = this.current.push(task, name, info);
        this.current.prev = prev;
        this.current.start();
        return this.current;
    }

    pop()
    {
        if (!this.current) return;
        this.current.end();
        this.current = this.current.prev;
    }

    finish()
    {
        this.current.end();
        this.root.print();
        this.current = null;
    }
}

// //////////////////////////////////////////


CABLES.BranchStack = BranchStack;
CABLES.Branch = Branch;
//# sourceMappingURL=cgl_branchprofiler.js.map
