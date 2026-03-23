
type CONTACT_CREATE_RESPONCE = {
    message: string
    result: {
        fullName: string
        mobile: string
        email: string
        message: string
    }
}
//PROJECT

type PROJECT_GET_RESPONCE = {
    message: string
    result: {}
}
//SKILL

type SKILL_GET_RESPONCE = {
    message: string
    result: {
        skillName: string
        category: string
        level: string
    }[]
}

//ABOUT

type ABOUT_GET_RESPONCE = {
    message: string
    result: {
        _id: string
        name: string
        title: string
        bio: string
        journey: string
        currentWork: string
        dob: string
        location: string
        email: string
        phone: string
        language: string
        profileImg: string
    }
}
//STATISTICS


type STAT_GET_RESPONCE = {
    message: string
    result: {
        expYear: string
        noOfProject: string
        tech: string
        happyClient: string
    }
}

//experience
type EXP_GET_RESPONCE = {
    message: string
    result: {
        Role: string
        company: string
        period: string
        desc: string
        risponsibility: string
    }
}

