export let cfg = {
  auth: {
    register: '/api/register',
    login: '/api/authenticate',
    activate: '/api/activate'
    },
  user: {
    addSkill: '/api/users/skills',
    skills: '/api/skills',
    address: '/api/addresses',
    profile: '/api/users/profile',
    education: '/api/users/education',
    experience: '/api/users/experience'
    },

  newsfeed: {
    allNewsFeed: '/api/newsfeeds',
    postNewsFeed: '/api/newsfeeds',
    comment: '/api/newsfeeds/comments',
    likes: '/api/newsfeeds/likes'
  },

  coaching: {
    request: '/api/caoching-requests',
    availabilities: '/api/caoching-requests/availabities',
    coachResponse: '/api/caoching-requests/coachResponse'
  },

  dashboard: {
    coachPending: '/api/caoching-requests/dashboard/pending',
    coachCurrent: '/api/caoching-requests/dashboard/current',
    coachrequestPending: '/api/caoching-requests/request/pending',
    coachrequestCurrent: '/api/caoching-requests/request/current'
  },

  connections: {
    connection: '/api/coaching/connections',
    follow: '/api/connections/follow',
    following: '/api/connections/following',
    unfollow: '/api/connections/following/unfollow',
    followers: '/api/connections/followers',
    block: '/api/connections/followers/block'
  }

};
