// This file was automatically added by edgio init.
// You should commit this file to source control.
// Learn more about this file at https://docs.edg.io/guides/edgio_config
module.exports = {
  connector: '@edgio/next',

  origins: [
    {
      name: 'origin',

      override_host_header: 'test-origin.edgio.net',

      hosts: [
        {
          location: 'test-origin.edgio.net',
        },
      ],

      tls_verify: {
        use_sni: true,
        sni_hint_and_strict_san_check: 'test-origin.edgio.net',
      },
    },
  ],

  next: {},
};
