export class WorkerBase<T> {
    private timer: NodeJS.Timeout | null = null
    private data: T | null = null
    private onUpdateCallback: ((data: T) => void) | null = null;

    constructor(private readonly fetchFunction: () => Promise<T>, private readonly interval: number) { }

    start() {
        this.timer = setInterval(async () => {
            try {
                const newData = await this.fetchFunction()
                this.data = newData
                if (this.onUpdateCallback) {
                    this.onUpdateCallback(newData);
                }
            } catch (error) {
                console.log('Error fetching data: ', error)
            }
        }, this.interval)
    }

    stop() {
        if (this.timer) {
            clearInterval(this.timer)
            this.timer = null
        }
    }

    getData(): T | null {
        return this.data
    }

    onUpdate(callback: (data: T) => void) {
        this.onUpdateCallback = callback
    }
}