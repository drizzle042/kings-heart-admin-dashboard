const activityTime = (createdAt) => {
    let now = new Date();
    let dateCreated = new Date(createdAt);
    let time = (now - dateCreated)/1000;
    var specificTime

    if (time < 60){
        specificTime = Math.ceil(time) + " secs";
    }else if (time >= 60 && time < 3600){
        specificTime = Math.ceil(time/60) + " mins";
    }else if(time >= 3600 && time < 86400){
        specificTime = Math.ceil(time/3600) + " hrs";
    }else {
        specificTime = Math.ceil(time/86400) + " days";
    }

    return specificTime
};


export { activityTime }