module.exports = {
  siteUrl: 'https://sealand.co.id',
  generateRobotsTxt: true,

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: [
          '/admin',
          '/auth',
        ],
      },
    ],
  },

  exclude: [
    '/admin/*',
    '/auth',
  ],
}