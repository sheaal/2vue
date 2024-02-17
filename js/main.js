new Vue({
    el: '#app',
    data: {
        showModal: false,
        groupName: '',
        input: '',
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
        closeModal() {
            this.showModal = false;
        },
        addCard() {
            if (this.groupName.trim() === '') {
                alert('Group name is required');
                return;
            }
            this.columns[0].tasks.push({
                groupName: this.groupName,
                inputs: this.inputs
            });
            this.groupName = '';
            this.inputs = [];
            this.closeModal();
        },
        addInput() {
            if (this.input.trim() === '') {
                alert('Input is required');
                return;
            }
            this.inputs.push(this.input);
            this.input = '';
        },
        moveTask(task, fromIndex, toIndex) {
            this.columns[fromIndex].tasks = this.columns[fromIndex].tasks.filter(t => t !== task);
            this.columns[toIndex].tasks.push(task);
        }
    }
});