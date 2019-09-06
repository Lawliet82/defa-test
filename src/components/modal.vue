<template>
    <div class="modal">
        <button class="modal__open" @click="add_new_student">Добавить студента</button>
        <div class="modal__overlay" v-show="is_open_modal" @click="hide_modal"></div>
        <div class="modal__wrap" v-show="is_open_modal">
            <form action="" class="modal__form" @submit.prevent="validate">
                <h3 class="modal__error-message" v-if="errors.length">
                    <b>При заполнении формы возникли ошибки:</b>
                </h3>
                <ul class="modal__error-errs">
                    <li class="modal__error-item" 
                        v-for="(error, index) in errors" 
                        :key="index">
                        {{ error }}
                    </li>
                </ul>
                <button class="modal__close" type="button" @click="hide_modal">X</button>
                <input type="text" class="modal__input" placeholder="Имя" v-model="student.name">
                <input type="text" class="modal__input" placeholder="Фамилия" v-model="student.surname">
                <input type="text" class="modal__input" placeholder="Дата рождения" v-model="student.date">
                <input type="text" class="modal__input" placeholder="Группа" v-model="student.group">
                <input type="submit" class="modal__submit" value="Добавить">
            </form>
        </div>
    </div>
</template>


<script>
import { mapGetters, mapActions, mapState } from 'vuex';
export default {
    data() {
        return {
            student: {
                name: '',
                surname: '',
                date: '',
                group: ''
            },
            student_id: 6, // нумерация с 6, т.к. в сторе есть уже 5
            errors: []
        }
    },
    computed: {
        ...mapGetters([
            'get_edited',
        ]),
        ...mapState([
            'is_open_modal'
        ]),

        load_edited() {
            return this.get_edited
        }
    },
    watch: {
        load_edited() {
            if (this.get_edited) {
                this.student.name = this.get_edited.name;
                this.student.surname = this.get_edited.surname;
                this.student.date = this.get_edited.date;
                this.student.group = this.get_edited.group;
            }
        }
    },
    methods: {
        ...mapActions([
            'add',
            'update_info',
            'modal_open',
            'close_modal',
            'clear_checked',
        ]),
        sendStudent() {
            this.add({
                id: this.student_id++,
                name: this.student.name,
                surname: this.student.surname,
                date: this.student.date,
                group: this.student.group,
                checked: false
            });
        },
        validate(e) {
            e.preventDefault();
            this.errors = [];
            if (!this.student.name) {
                this.errors.push('Укажите имя.');
            } else if (!this.validation(this.student.name, 'name')) {
                this.errors.push('Укажите корректное имя.');
            }

            if (!this.student.surname) {
                this.errors.push('Укажите фамилию.');
            } else if (!this.validation(this.student.surname, 'name')) {
                this.errors.push('Укажите корректную  фамилию.');
            }

            if (!this.student.date) {
                this.errors.push('Укажите дату рождения.');
            } else if (!this.validation(this.student.date, 'date')) {
                this.errors.push('Укажите корректную  дату. (Нпр. 11.11.1999)');
            }

            if (!this.student.group) {
                this.errors.push('Укажите группу.');
            } else if (!this.validation(this.student.group, 'group')) {
                this.errors.push('Укажите корректную  группу. (Нпр. ИВТ-1-15)');
            }

            if (!this.errors.length) {
                if (this.get_edited) {
                    this.update_info({
                        id: this.get_edited.id,
                        name: this.student.name,
                        surname: this.student.surname,
                        date: this.student.date, 
                        group: this.student.group,
                        checked: false
                    });
                } else {
                    this.sendStudent();
                    this.student.name = '';
                    this.student.surname = '';
                    this.student.date = '';
                    this.student.group = '';
                }
                this.show_modal = false;
                return 
            }
        },
        validation(value, validType) {
            let pattern = null;

            switch (validType) {
                case 'name': 
                    pattern = /^[а-яА-Я ]{2,7}$/;
                    break;
                
                case 'date': 
                    pattern = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
                    break;

                case 'group': 
                    pattern = /^[А-Я]{3}[-]{1}[1-5]{1}[-]{1}[0-9]{2}$/;
                    break;
                default:
                    console.log('необходимо передать тип валидации');
                    break;
            }
            return pattern.test(value);
        },

        add_new_student() {
            this.student.name = '';
            this.student.surname = '';
            this.student.date = '';
            this.student.group = '';
            this.modal_open();
        },

        hide_modal() {
            this.close_modal();
            if (this.get_edited) {
                this.clear_checked(this.get_edited.id);
            }
        }
    },
}
</script>