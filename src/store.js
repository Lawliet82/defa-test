import Vue from 'vue'
import Vuex from 'vuex'
import { stat } from 'fs';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    students: [
      {
        id: 0,
        checked: false,
        name: 'lorem1',
        surname: 'lorem1',
        date: '01.01.1976',
        group: 'АВТ-1-15'
      },
      {
        id: 1,
        checked: false,
        name: 'lorem2',
        surname: 'lorem2',
        date: '01.01.1976',
        group: 'АВТ-1-15'
      },
      {
        id: 2,
        checked: false,
        name: 'lorem3',
        surname: 'lorem3',
        date: '01.01.1976',
        group: 'АВТ-1-15'
      },
      {
        id: 3,
        checked: false,
        name: 'lorem4',
        surname: 'lorem4',
        date: '01.01.1976',
        group: 'АВТ-1-15'
      },
      {
        id: 14,
        checked: false,
        name: 'lorem5',
        surname: 'lorem5',
        date: '01.01.1976',
        group: 'АВТ-1-15'
      },
      {
        id: 5,
        checked: false,
        name: 'lorem6',
        surname: 'lorem6',
        date: '01.01.1976',
        group: 'АВТ-1-15'
      }
    ],
    student: {},
    checked_students: [],
    search_student: null,
    checked_students: [],
    open_modal: false,
    edited_student: null,
  },
  mutations: {
    ADD_STUDENT (state, payload) {
      state.students.push(payload)
    },

    REMOVE_STUDENT (state, value) {
      let checks = state.checked_students,
          students = state.students,
          student_index = students.findIndex( x => x.id === value);
      
      if (checks.length > 0) {
        let checked_id = checks.findIndex( x => x === value);
        checks.splice(checked_id, 1);
      }
      state.students.splice(student_index, 1);  
    },

    REMOVE_CHECKED (state, value) {
      let checks = state.checked_students, // массив ID студентов, не индексов
          students = state.students;

      for (let i = 0; i < checks.length; i++) {
        let student_index = students.findIndex( x => x.id === checks[i]);
        students.splice(student_index, 1);
      }
      state.checked_students = [];
    },

    ADD_CHECKED (state, value) {
      const checks = state.checked_students;
      let index = checks.indexOf(value),
          student_id = state.students.findIndex( x => x.id === value);

      if (index === -1) {
        state.checked_students.push(value);
        state.students[student_id].checked = true;
      } else {
        checks.splice(index, 1);
        state.students[student_id].checked = false;
      }
    },

    EDIT_ITEM (state, value) {
      let students = state.students;
      for (let i = 0; i < students.length; i++) {
        if ( students[i].id === value ) {
          state.edited_student = students[i];
          students[i].checked = true;
          state.edited_student = students[i];
          break;
        }
      }
    }




  },

  actions: {
    add(store, payload) {
      store.commit('ADD_STUDENT', payload)
    },
    remove_student(store, index) {
      store.commit('REMOVE_STUDENT', index)
    },
    remove_checked(store, value) {
      store.commit('REMOVE_CHECKED', value)
    },
    add_checked(store, value) {
      store.commit('ADD_CHECKED', value)
    },
    edit_item(store, student_id) {
      store.commit('EDIT_ITEM', student_id)
    }
  },

  getters: {
    get_students: (state) => state.students,
    get_edited: (state) => state.edited_student,
  }

})
