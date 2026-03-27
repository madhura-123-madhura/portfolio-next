type PROJECT_REQUEST = {
    title: string
    desc: string
    category: string
    technologies: string
    liveUrl: string
    gitHubUrl: string
}
type PROJECT_RESPONS = {
    message: string
    result: {
        _id: string
        title: string
        desc: string
        category: string
        technologies: string
        liveUrl: string
        gitHubUrl: string
    }[]
}

type UPDATE_REQUEST = {
    _id: string
    title: string
    desc: string
    category: string
    technologies: string
    liveUrl: string
    gitHubUrl: string
}

type UPDATE_RESPONCE = {
    message: string
}
type DELETE_REQUEST = {
    _id: string
}
type DELETE_RESPONCE = {
    message: string
}

//Experience

type EXP_REQUEST = {
    Role: string
    company: string
    period: string
    desc: string
    risponsibility: string

}
type EXP_RESPONS = {
    message: string
    result: {
        _id: string
        Role: string
        company: string
        period: string
        desc: string
        risponsibility: string
    }[]
}

type UPDATE_EXP_REQUEST = {
    _id: string
    Role: string
    company: string
    period: string
    desc: string
    risponsibility: string
}

type UPDATE_EXP_RESPONCE = {
    message: string
}
type DELETE_EXP_REQUEST = {
    _id: string
}
type DELETE__EXP_RESPONCE = {
    message: string
}

//SKILLS

type SKILL_REQUEST = {
    skillName: string
    category: string
    level: string

}
type SKILL_RESPONS = {

    message: string,
    result: {
        _id: string,
        skillName: string,
        category: string,
        level: string,

    }[]
}

type UPDATE_SKILL_REQUEST = {
    _id: string
    skillName: string
    category: string
    level: string
}

type UPDATE_SKILL_RESPONCE = {
    message: string
}
type DELETE_SKILL_REQUEST = {
    _id: string
}
type DELETE__SKILL_RESPONCE = {
    message: string
}

//STATISTICS

type STAT_REQUEST = {
    expYear: string
    noOfProject: string
    tech: string
    happyClient: string

}
type STAT_RESPONS = {
    message: string
    result: {
        _id: string
        expYear: string
        noOfProject: string
        tech: string
        happyClient: string

    }
}

type UPDATE_STAT_REQUEST = {
    _id?: string
    expYear: string
    noOfProject: string
    tech: string
    happyClient: string
}

type UPDATE_STAT_RESPONCE = {
    message: string
}
type DELETE_STAT_REQUEST = {
    _id: string
}
type DELETE__STAT_RESPONCE = {
    message: string
}

//ABOUT
type ABOUT_REQUEST = {
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
    profileImg?: File
    resume?: FileList

}
type ABOUT_RESPONS = {
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
        profileImg: File
        resume?: FileList
    }
}

type UPDATE_ABOUT_REQUEST = {
    _id?: string
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
    profileImg?: File
    resume?: File
}

type UPDATE_ABOUT_RESPONCE = {
    message: string
}
type DELETE_ABOUT_REQUEST = {
    _id: string
}
type DELETE__ABOUT_RESPONCE = {
    message: string
}

//contact

type CONTACT_RESPONS = {
    message: string,
    result: {
        _id: string
        fullName: string
        mobile: string
        email: string
        message: string
    }[]


}
type SEND_REPLY_REQUEST = {
    _id: string

}
type SEND_REPLY_RESPONCE = {
    message: string

}

type DELETE_CONTACT_REQUEST = {
    _id: string

}
type DELETE_CONTACT_RESPONCE = {
    message: string
}
