<template>
    <div class="students__wrap">
        <table class="students__table">
            <tr class="students__table-head">
                <th class="students__table-head--cell">#</th>
                <th class="students__table-head--cell">ID</th>
                <th class="students__table-head--cell">Имя</th>
                <th class="students__table-head--cell">Фамилия</th>
                <th class="students__table-head--cell">Возраст</th>
                <th class="students__table-head--cell">Группа</th>
                <th class="students__table-head--cell">Удалить</th>
                <th class="students__table-head--cell">Изменить</th>
            </tr>

            <tr class="students__table-row"
                v-if="get_students"
                v-for="(item, index) in get_students" :key="index"
                @click="update_check(item.id)"
                :class="{checked : item.checked }"
                >
                <td class="students__table-cell">
                    <input type="checkbox" class="students__table-check"
                    :value="item.id"
                    :id="'check-'+ item.id"
                    @change="update_check(item.id)"
                    :checked="item.checked"
                    >
                    <label
                        class="students__table-check-label"
                        :for="'check-'+ item.id">
                    </label>
                </td>
                <td class="students__table-cell">{{item.id}}</td>
                <td class="students__table-cell">{{item.name}}</td>
                <td class="students__table-cell">{{item.surname}}</td>
                <td class="students__table-cell">{{item.date}}</td>
                <td class="students__table-cell">{{item.group}}</td>
                <td class="students__table-cell">
                    <button class="students__table-del" type="button"
                        @click="remove_item(item.id)"
                    >X</button>
                </td>
                 <td class="students__table-cell">
                    <button class="students__table-del" type="button"
                        @click="change_item(item.id)"
                    >Изменить</button>
                </td>
            </tr>
        </table>
        <button class="students__del-btn" type="button"
            @click="remove_checks"
        >Удалить выбранное</button>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
    data() {
        return {
            checks: []
        }
    },
    computed: {
        ...mapGetters([
            'get_students',
        ]),
    },
    methods: {
        ...mapActions([
            'remove_student', 
            'remove_checked',
            'add_checked',
            'edit_item'
        ]),

        update_check(id) {
            this.add_checked(id)
        },
        remove_item(id) {
            this.remove_student(id)
        },
        remove_checks () {
            this.remove_checked()
        },
        change_item(id) {
            this.edit_item(id)
        },
    },
}
</script>