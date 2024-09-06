export default interface StudentData {
    id: string
    name: string;
    course: string;
    semester: string;
    presence: string[];
    percentPresence: number;
    totalPoints: number;
    average: number; // Média fixa de aprovação
    status: string;
    email: string;
    reportCard: Blob;
}

