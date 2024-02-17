new Vue({
    el: '#app',
    data() {
        return {
            showModal: false,
            groupName: '',
            inputs: [
                {text: '', checked: false},
            ],
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
        }
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
            this.inputs = [
                {text: '', checked: false},
            ];
            this.closeModal();
        },
        // addInput() {
        //     this.inputs.push({text: '', checked: false});
        // },
        addInput() {
            if (this.inputs.length < 5) {
                this.inputs.push({text: '', checked: false});
            } else {
                alert('You can add up to 5 items.');
            }
        },
        removeInput(index) {
            this.inputs.splice(index, 1);
        },
        moveTask(task, fromIndex, toIndex) {
            this.columns[fromIndex].tasks = this.columns[fromIndex].tasks.filter(t => t !== task);
            this.columns[toIndex].tasks.push(task);
        }
    }
})