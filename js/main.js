new Vue({
    el: '#app',
    data() {
        return {
            showModal: false,
            groupName: '',
            inputs: [{text: '', checked: false}],
            columns: [
                { title: 'To Do', tasks: [] },
                { title: 'In Progress', tasks: [] },
                { title: 'Done', tasks: [] }
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
            let newTask = {
                groupName: this.groupName,
                inputs: this.inputs.map(input => ({...input})),
                completionPercentage: 0
            };
            let allInputsFilled = this.inputs.every(input => input.text.trim() !== '');
            if (!allInputsFilled) {
                alert('You need to fill all inputs before adding a card.');
                return;
            }
            if (this.inputs.length < 3 || this.inputs.length > 5) {
                alert('The number of lists should be in the range from 3 to 5');
                return;
            }
            if (this.columns[0].tasks.length < 3) {
                this.columns[0].tasks.push({
                    groupName: this.groupName,
                    inputs: this.inputs.map(input => ({...input})),
                    completionPercentage: 0
                });

                this.groupName = '';
                this.inputs = [{ text: '', checked: false }];

                this.closeModal();
                this.updateTaskStatus();
            } else {
                alert('You can add up to 3 tasks in "To Do" column.');
            }

            localStorage.setItem('taskManagerData', JSON.stringify(this.$data));
        },
        // updateTaskStatus() {
        //     this.columns.forEach((column) => {
        //         if (column.title === 'To Do' || column.title === 'In Progress') {
        //             column.tasks.forEach((task) => {
        //                 let completedCount = task.inputs.filter((input) => input.checked).length;
        //                 task.completionPercentage = (completedCount / task.inputs.length) * 100;

        //                 if (task.completionPercentage > 50 && column.title === 'To Do') {
        //                     let fromColumn = this.columns.find((col) => col.title === 'To Do');
        //                     let toColumn = this.columns.find((col) => col.title === 'In Progress');
        //                     this.moveTask(task, fromColumn, toColumn);
        //                 } else if (task.completionPercentage === 100 && column.title === 'In Progress') {
        //                     let fromColumn = this.columns.find((col) => col.title === 'In Progress');
        //                     let toColumn = this.columns.find((col) => col.title === 'Done');
        //                     this.moveTask(task, fromColumn, toColumn);
        //                 } else if (task.completionPercentage < 50 && column.title === 'In Progress') {
        //                     let fromColumn = this.columns.find((col) => col.title === 'In Progress');
        //                     let toColumn = this.columns.find((col) => col.title === 'To Do');
        //                     this.moveTask(task, fromColumn, toColumn);
        //                 }
        //                 if (column.title === 'In Progress') {
        //                     const now = new Date();
        //                     if (task.inputs.every(input => input.checked)) {
        //                         task.completionDate = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
        //                     } else {
        //                         task.completionDate = null;
        //                     }
        //                 } else {
        //                     task.completionDate = null;
        //                 }
        //             });
        //         }
        //     });

        //     localStorage.setItem('taskManagerData', JSON.stringify(this.$data));
        // },

        updateTaskStatus() {
            this.columns.forEach((column) => {
                if (column.title === 'To Do' || column.title === 'In Progress') {
                    column.tasks.forEach((task) => {
                        let completedCount = task.inputs.filter((input) => input.checked).length;
                        task.completionPercentage = (completedCount / task.inputs.length) * 100;

                        if (column.title === 'To Do') {
                            if (task.completionPercentage >= 50 && this.columns[1].tasks.length < 5) {
                                let fromColumn = this.columns.find((col) => col.title === 'To Do');
                                let toColumn = this.columns.find((col) => col.title === 'In Progress');
                                this.moveTask(task, fromColumn, toColumn);
                            } else if (task.completionPercentage === 100) {
                                let fromColumn = this.columns.find((col) => col.title === 'To Do');
                                let toColumn = this.columns.find((col) => col.title === 'Done');
                                this.moveTask(task, fromColumn, toColumn);
                            }
                        } else if (column.title === 'In Progress') {
                            if (task.completionPercentage < 50 && this.columns[0].tasks.length < 3) {
                                let fromColumn = this.columns.find((col) => col.title === 'In Progress');
                                let toColumn = this.columns.find((col) => col.title === 'To Do');
                                this.moveTask(task, fromColumn, toColumn);
                            } else if (task.completionPercentage === 100) {
                                let fromColumn = this.columns.find((col) => col.title === 'In Progress');
                                let toColumn = this.columns.find((col) => col.title === 'Done');
                                this.moveTask(task, fromColumn, toColumn);
                            }
                        }

                        if (column.title === 'In Progress') {
                            const now = new Date();
                            if (task.inputs.every(input => input.checked)) {
                                task.completionDate = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
                            } else {
                                task.completionDate = null;
                            }
                        } else {
                            task.completionDate = null;
                        }

                    });
                }
            });

            localStorage.setItem('taskManagerData', JSON.stringify(this.$data));
        },

        moveTask(task, fromColumn, toColumn) {
            if (toColumn.title === 'In Progress' && toColumn.tasks.length === 5) {
                alert('You can have up to 5 tasks in "In Progress" column.');
                return;
            }
            const taskIndex = fromColumn.tasks.findIndex(t => t === task);
            if (taskIndex > -1) {
                fromColumn.tasks.splice(taskIndex, 1);

                toColumn.tasks.push(task);

                if (fromColumn.title === 'To Do' && toColumn.title === 'In Progress') {
                    this.updateTaskStatus();
                }
            }
        },
        // removeCard(task, column) {
        //     const taskIndex = column.tasks.findIndex(t => t === task);
        //     if (taskIndex > -1) {
        //         column.tasks.splice(taskIndex, 1);
        //     }
        // },
        addInput() {
            if (this.inputs.length < 5) {
                this.inputs.push({text: '', checked: false});
            } else {
                alert('You can add up to 5 items.');
            }
        },
        removeInput(index) {
            if (this.inputs.length > 3) {
                this.inputs.splice(index, 1);
            } else {
                alert('You need at least 3 inputs.');
            }
        },
    },
    mounted() {
        // Load data from localStorage
        const savedData = localStorage.getItem('taskManagerData');
        if (savedData) {
            Object.assign(this.$data, JSON.parse(savedData));
        }
    }
})
