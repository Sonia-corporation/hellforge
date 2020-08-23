import _ from "lodash"

export class ActivityService {
  private static _instance: ActivityService

  public static getInstance(): ActivityService {
    if(_.isNil(ActivityService._instance)) {
      ActivityService._instance = new ActivityService()
    }
    return ActivityService._instance
  }

  public setActivity(user: ClientUser, activity: ActivityType) {
    user?.setActivity("!hell help", { type: activity })
  }
}
