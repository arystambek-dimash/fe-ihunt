// utils.js

// Function to calculate the time remaining until the next job time
export const getTimeRemaining = (jobTimes) => {
    const now = new Date();
    const times = jobTimes.map(time => {
        const [hours, minutes] = time.split(':').map(Number);
        const jobTime = new Date(now);
        jobTime.setHours(hours, minutes, 0, 0);
        if (jobTime <= now) {
            jobTime.setDate(jobTime.getDate() + 1); // Set for the next day if the time has already passed
        }
        return jobTime;
    });

    const nextJobTime = times.reduce((prev, curr) => (curr - now < prev - now ? curr : prev));
    const total = Date.parse(nextJobTime) - Date.parse(now);

    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);

    return { total, hours, minutes, seconds };
};
