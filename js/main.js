new Vue({
    el: '#app',
    data: {
        showModal: false,
        groupName: '',
        inputs: ['', '', ''],
        columns: [
            {
                title: 'To Do',
                tasks: []
            },
            {
                title: 'In Progress',
                tasks: []
            },
            {
                title: 'Done',
                tasks: []
            }
        ]
    },
    methods: {
        openModal() {
            this.showModal = true;
        },
        addCard() {
            const newTask = {
                groupName: this.groupName,
                inputs: this.inputs.filter(input => input !== '')
            };
            this.columns[0].tasks.push(newTask);
            this.groupName = '';
            this.inputs = ['', '', ''];
            this.showModal = false;
        },
        moveTask(task, fromIndex, toIndex) {
            this.columns[fromIndex].tasks.splice(this.columns[fromIndex].tasks.indexOf(task), 1);
            this.columns[toIndex].tasks.push(task);
        }
    }
});