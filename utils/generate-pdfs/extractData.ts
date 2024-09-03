import StudentData from "@/types/StudentData";

function extractData(json: any[]): StudentData[] {
    const passingAverage = 180;

    // Identificar o total de aulas
    const firstRecord = json[3] || {};
    const totalClasses = Object.keys(firstRecord)
        .filter(key => key.startsWith('__EMPTY') && !isNaN(Number(key.split('_')[1])) && Number(key.split('_')[1]) <= 12)
        .length - 1;

    return json.map((student, index) => {
        const courseAndSemester = Object.keys(student)[0]; 
        const course = courseAndSemester.split('-')[0] 
        const semester = courseAndSemester.split('-')[1] 
        
        const name = student[courseAndSemester]; 

        const email = student.__EMPTY_21;
        
        if (!name) {
            return null;
        }

        // Extração de presença
        const presence: string[] = [];

        let totalPoints = 0;
        let totalAttendance = 0;
        let percentPresence = 0;
        

        for (let i = 0; i < totalClasses; i++) {
            let attendanceStatus = student[`__EMPTY_${i}`];

            if(i==0){
                attendanceStatus = student[`__EMPTY`];
            }
            
            const isPresent = attendanceStatus === 'P';

            if (isPresent) {
                totalAttendance++;
            }
            presence.push(attendanceStatus || '');
        }

        percentPresence = (totalAttendance / totalClasses) * 100;

        for (let i = 13; i <= 17; i++) {
            totalPoints += Number(student[`__EMPTY_${i}`]);
        }


        return {
            id: index.toString(),
            name: name || '',
            course: course,
            semester: semester,
            presence: presence,
            percentPresence: Number(percentPresence) || 0,
            totalPoints: totalPoints || 0,
            average: passingAverage, // Média fixa para aprovação
            status: totalPoints >= passingAverage ? 'Aprovado' : 'Reprovado',
            email:email,
        };
    }).slice(4) as StudentData[];
}

export default extractData;
