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
                        // else if (completionPercentage === 100){
                        //     if (column === 'To Do') {
                        //     }

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
            this.inputs.push({text: '', checked: false});
        },
        removeInput(index) {
            this.inputs.splice(index, 1);
        },
    }
})
