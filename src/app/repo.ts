import { knexPool } from '../../knex-config';

// Get teacher id by name
export const getTeacherIdByName = (teacherName: string) => {
  return knexPool.from('teacher')
    .column('id')
    .where('name', teacherName)
    .select();
};

// create teacher by name
export const createTeacher = (teacherName: string) => {
  return knexPool.into('teacher')
    .insert({
      name: teacherName
    },
      'id' // returns id
    );
};

// get student id by name
export const getStudentIdByName = (studentName: string) => {
  return knexPool.from('student')
    .column('id')
    .where('name', studentName)
    .select();
};

// TODO: improve logic and return whole student object
export const getStudentsByTeacher = (teacherName: string) => {
  return knexPool.from('teacherStudent')
    .column('student.name as student_name')
    .where('teacher.name', teacherName)
    .leftJoin('teacher', { 'teacherStudent.teacher_id': 'teacher.id' })
    .leftJoin('student', { 'teacherStudent.student_id': 'student.id' })
    .select();
};

export const getNotSuspendedStudentsByTeacher = (teacherName: string) => {
  return knexPool.from('teacherStudent')
    .column('student.name as student_name')
    .where('teacher.name', teacherName)
    .where('student.isSuspend', 0)
    .leftJoin('teacher', { 'teacherStudent.teacher_id': 'teacher.id' })
    .leftJoin('student', { 'teacherStudent.student_id': 'student.id' })
    .select();
};

export const getNonSuspendedStudent = (studentName: string) => {
  return knexPool.from('student')
    .column('name')
    .where('name', studentName)
    .where('isSuspend', 0)
    .select();
};

// create student 
export const createStudent = (studentName: string) => {
  return knexPool.into('student')
    .insert({
      name: studentName
    },
      'id' // returns id
    );
};


export const updateStudentById = (studentId:number, student: Object) => {
 
  return knexPool('student')
    .where({id:studentId})
    .update({
      name: student['name'],
      isSuspend: student['isSuspend']
    });
};


// get teacher student id 
export const getTeacherStudentId = (teacherId: number, studentId: number) => {
  return knexPool.from('teacherStudent')
    .column('id')
    .where({
      teacher_id: teacherId,
      student_id: studentId
    })
    .select();
};

// create teacher student id
export const createTeacherStudent = (teacherId: number, studentId: number) => {
  return knexPool.into('teacherstudent')
    .insert({
      teacher_id: teacherId,
      student_id: studentId
    },
      'id'
    );
};
