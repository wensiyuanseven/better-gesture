module.exports = {
	title:"better-gesture",
	description:"一个极小的,可兼容原生JS,Vue,PC,Mobile,小程序的多端手势库",
	head:[
		['link',{rel: 'shortcut icon', type: "image/x-icon",href:'./favicon.ico'}]
  ],
  lastUpdated: 'Last Updated',
  themeConfig: {
    displayAllHeaders: true, // 默认值：false
    nav: [
        { text: '指南',
        link: '/guide/'
        },
        {
          text: 'API参考',
          link:'/api/'
        },
        { text: 'GitHub', link: 'https://github.com/wensiyuanseven/better-gesture'}
      ],
      sidebar: {
        '/guide/': [
          '',
          'install',
          'use',
          'event'
        ],
        '/api/': [
          '',
          'touch',
        ],
        // fallback
        '/': [
          ''
        ]
      }
  }
}
