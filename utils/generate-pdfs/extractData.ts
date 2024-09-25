import StudentData from "@/types/StudentData";

function extractData(json: any[]): StudentData[] {
    const passingAverage = 60;

    // Identificar o total de aulas
    const firstRecord = json[3] || {};
    const totalClasses = Object.keys(firstRecord)
        .filter(key => key.startsWith('__EMPTY') && !isNaN(Number(key.split('_')[1])) && Number(key.split('_')[1]) <= 12)
        .length - 1;

    let days: string[] = [];

    return json.map((student, index) => {
        const courseAndSemester = Object.keys(student)[0];
        const [course, semester] = courseAndSemester.split('-').map(value => value.trim());


        const name = student[courseAndSemester];

        const email = student.__EMPTY_27;

        if (!name) {
            return null;
        }

        let totalPoints = 0;
        let totalAttendance = 0;
        let percentPresence = 0;

        const presence: string[][] = [];

        // Extrai os Dias e Presenças
        for (let i = 0; i < totalClasses; i++) {
            let day = '';

            if (index === 3) {
                if (i === 0) {
                    day = student[`__EMPTY`] || ''; 
                } else {
                    day = student[`__EMPTY_${i}`] || ''; 
                }

  
                if (day) {
                    days.push(day);
                }
            }

            // Verifica o status de presença
            let attendanceStatus = student[`__EMPTY_${i}`] || '';

            if (i === 0) {
                attendanceStatus = student[`__EMPTY`] || '';
            } 

            if(attendanceStatus.toUpperCase() === 'P'){
                totalAttendance++;
            }

            presence.push([days[i], attendanceStatus]);
        }

        percentPresence = (totalAttendance / totalClasses) * 100;

        for (let i = 13; i <= 23; i++) {
            totalPoints += Number(student[`__EMPTY_${i}`]) || 0;
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
            email: email,
        };
    }).slice(4).filter(student => student !== null) as StudentData[];
}

export default extractData;
