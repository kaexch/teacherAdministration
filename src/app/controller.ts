import { Request, Response } from 'express';
import * as repo from './repo';

export const register = async function (req: Request, res: Response) {
  try {
    const teacherName: string = req.body.teacher;
    const studentNames: string[] = req.body.students;

    let rawTeacherId = await repo.getTeacherIdByName(teacherName);
    if (rawTeacherId.length === 0) {
      rawTeacherId = await repo.createTeacher(teacherName);
      
    }
    const teacherId = rawTeacherId[0]['id'];

    for (let i=0;i<studentNames.length;i++) {
      let rawStudentId = await repo.getStudentIdByName(studentNames[i]);
      if (rawStudentId.length === 0) {
        rawStudentId = await repo.createStudent(studentNames[i]);
      }
      const studentId = rawStudentId[0]['id'];

      const teacherStudentId = await repo.getTeacherStudentId(teacherId, studentId); // by design, getTeacher or getStudent should always return max 1 id only.
      if (teacherStudentId.length === 0) {
        await repo.createTeacherStudent(teacherId, studentId);
      }
    }
    //Improvement: return proper message showing existed teacher-student and newly created teacher-student
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ 'Message': error });
  }
}

export const getCommonStudent = async function (req: Request, res: Response) {
  try {

    let teacherName: string[] = [];
    let commonStudents: string[] = [];

    if (req.query.teacher) {
      if (Array.isArray(req.query.teacher)) {
        teacherName = req.query.teacher;
      }
      else {
        teacherName= [req.query.teacher];
      }
    }

    // Loop through each teacher to get a list of students and get the intersect students.
    // TODO: improve logic , try to do it in SQL
    for (let i = 0; i < teacherName.length; i++) {
      const rawStudents:Object[] = await repo.getStudentsByTeacher(teacherName[i]);
      const students:string[] = rawStudents.map((student:any)=> student['student_name']);

      if (i === 0) {
        commonStudents = [...students]; // prevent array referencing 
        continue;
      }

      commonStudents = [...commonStudents.filter(x => students.includes(x))];
    }

    if (teacherName.length === 1) {
      commonStudents.push(`students_only_under_${teacherName[0]}`);
    }

    res.status(200).json({
      'students': commonStudents
    });

  } catch (error) {
    res.status(500).json({ 'Message': error });
  }
}

export const suspend = async function (req: Request, res: Response) {
  try {
    const studentName: string = req.body.student;

    let rawStudentId = await repo.getStudentIdByName(studentName);

    if (rawStudentId.length === 0 ) {
      return res.status(202).json({
        message: 'Student with the name specified does not exist.',
        name: studentName
      });
    }
    const studentId = rawStudentId[0]['id'];

    // TODO: convert to interface
    const student: Object = {
      name:studentName,
      isSuspend: 1
    }
    await repo.updateStudentById(studentId,student);
    
    //Improvement: return proper message showing existed teacher-student and newly created teacher-student
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ 'Message': error });
  }
}

export const retrieveForNotifications = async function (req: Request, res: Response) {
  try {
    const teacherName: string = req.body.teacher;
    const notification: string = req.body.notification;

    let rawTeacherId = await repo.getTeacherIdByName(teacherName);

    if (rawTeacherId.length === 0 ) {
      return res.status(202).json({
        message: 'Teacher with the name specified does not exist.',
        name: teacherName
      });
    }

    const rawStudentNames = await repo.getNotSuspendedStudentsByTeacher(teacherName);
    const studentNames: string[] = rawStudentNames.map((student: any) => student['student_name']);

    // extract students mentioned in the notification
    const mentions:string[] = notification.match(/(?<=@)([^\s]*)/g) || [];

    for(const mention of mentions) {
      const student= await repo.getNonSuspendedStudent(mention);
      if(student.length!==0){
        studentNames.push(student[0]['name']);
      }
    }
    
    res.status(200).json({
      recipients:studentNames
    });

  } catch (error) {
    res.status(500).json({ 'Message': error });
  }
}