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

            let newTask = {
                groupName: this.groupName,
                inputs: this.inputs.map(input => ({...input})),
                completionPercentage: 0 // Добавляем новое свойство для отслеживания процента завершения
            };

            this.columns[0].tasks.push(newTask);
            this.groupName = '';
            this.inputs = [{text: '', checked: false}];

            this.closeModal();

            this.updateTaskStatus(); // Вызываем функцию для обновления статуса задачи
        },

        updateTaskStatus() {
            this.columns.forEach(column => {
                column.tasks.forEach(task => {
                    let completedCount = task.inputs.filter(input => input.checked).length;
                    task.completionPercentage = (completedCount / task.inputs.length) * 100; // Рассчитываем процент завершения задачи

                    if (task.completionPercentage >= 50 && column !== this.columns[2]) {
                        this.moveTask(task, column, this.columns[this.columns.indexOf(column) + 1]); // Перемещаем задачу в следующий столбец
                    }
                    if (task.completionPercentage === 100 && column !== this.columns[2]) {
                        this.moveTask(task, column, this.columns[this.columns.indexOf(column) + 2]); // Перемещаем задачу в третий столбец
                        task.completedAt = new Date().toLocaleString(); // Добавляем дату и время завершения задачи
                    }
                });
            });
        },

        moveTask(task, fromColumn, toColumn) {
            fromColumn.tasks.splice(fromColumn.tasks.indexOf(task), 1);
            toColumn.tasks.push(task);
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
        moveTask(task, fromIndex, toIndex) {
            this.columns[fromIndex].tasks = this.columns[fromIndex].tasks.filter(t => t !== task);
            this.columns[toIndex].tasks.push(task);
        }
    }
})