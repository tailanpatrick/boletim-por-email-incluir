import StudentData from "@/types/StudentData";

function extractData(json: any[]): StudentData[] {
    const passingAverage = 180;

    // Identificar o total de aulas
    const firstRecord = json[3] || {};
    const totalClasses = Object.keys(firstRecord)
        .filter(key => key.startsWith('__EMPTY_') && !isNaN(Number(key.split('_')[1])) && Number(key.split('_')[1]) <= 12)
        .length - 1 ;

    return json.map((student, index) => {
        const name = student.__EMPTY;

        if(!name){
            return null;
        }

        // Extração de presença
        const presence: string[] = [];

        let totalPoints = 0;
        let totalAttendance = 0;
        let percentPresence = 0;

        for (let i = 1; i <= totalClasses; i++) {
            const attendanceStatus = student[`__EMPTY_${i}`];
            const isPresent = attendanceStatus === 'P';

            if (isPresent) {
                totalAttendance++;
            }
            presence.push(attendanceStatus || '');
        }

        percentPresence = (totalAttendance / totalClasses) * 100;

        for (let i = 14; i <= 18; i++) {
            totalPoints += Number(student[`__EMPTY_${i}`]);
        }


        return {
            id: index.toString(),
            name: name || '',
            presence: presence,
            percentPresence: percentPresence.toFixed(2) || 0,
            totalPoints: totalPoints || 0,
            average: passingAverage, // Média fixa para aprovação
            status: totalPoints >= passingAverage ? 'Aprovado' : 'Reprovado',
        };
    }).slice(4) as StudentData[];
}

export default extractData;
