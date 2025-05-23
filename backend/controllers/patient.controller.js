export const profile = (req, res) => {
    res.send("hello I am patient");
}

export const appointment = (req, res) => {
    res.send("hello I made appointment");
}

export const healthRecord = (req, res) => {
    res.send("Hello Patient is Good ")
}

export const medicineRemainder = (req, res) => {
    res.send("Hello take medicine at 6PM")  
}
