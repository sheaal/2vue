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

            this.columns[0].tasks.push(newTask);
            this.groupName = '';
            this.inputs = [{text: '', checked: false}];

            this.closeModal();
            this.updateTaskStatus();
        },

        updateTaskStatus() {
            // Здесь оставьте только логику обновления статуса задач, без вызова перемещения задачи
            this.columns.forEach((column) => {
                if (column.title === 'To Do' || column.title === 'In Progress') {
                    column.tasks.forEach((task) => {
                        let completedCount = task.inputs.filter((input) => input.checked).length;
                        task.completionPercentage = (completedCount / task.inputs.length) * 100;

                        if (task.completionPercentage > 50 && column.title === 'To Do') {
                            let fromColumn = this.columns.find((col) => col.title === 'To Do');
                            let toColumn = this.columns.find((col) => col.title === 'In Progress');
                            this.moveTask(task, fromColumn, toColumn);
                        }
                        else if (task.completionPercentage === 100 && column === this.columns[1]) {
                            let fromColumn = this.columns.find(col => col.title === 'In Progress');
                            let toColumn = this.columns.find(col => col.title === 'Done');
                            this.moveTask(task, fromColumn, toColumn);
                        }
                        else if (task.completionPercentage < 50 && column.title === 'In Progress') {
                            let fromColumn = this.columns.find(col => col.title === 'In Progress');
                            let toColumn = this.columns.find(col => col.title === 'To Do');
                            this.moveTask(task, fromColumn, toColumn);
                        }
                    });
                }
            });
        },
        // Добавьте метод для перемещения задач
        moveTask(task, fromColumn, toColumn) {
            // Удаляем задачу из исходного столбца
            let taskIndex = fromColumn.tasks.indexOf(task);
            if (taskIndex > -1) {
                fromColumn.tasks.splice(taskIndex, 1);

                // Добавляем задачу в целевой столбец
                toColumn.tasks.push(task);
            }
        },
        removeCard(task, column) {
            // Удаляем задачу из столбца
            column.tasks.splice(column.tasks.indexOf(task), 1);
        },
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
    }
})
