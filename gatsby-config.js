module.exports = {
    plugins: [
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                icon: 'src/images/icon.png',
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/src/images`,
            }
        },
        {
            resolve: `gatsby-plugin-google-gtag`,
            options: {
                trackingIds: [
                    'G-W6LG4GR86Z',
                ],
                pluginConfig: {
                    head: true,
                },
            },
        },
    ],
}
