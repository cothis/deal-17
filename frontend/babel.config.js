module.exports = function (api) {
    // plugin이나 preset을 캐시하여 다시 실행하지 않도록
    api.cache(true);
  
    // preset 추가
    const presets = [
      [
        '@babel/preset-env',
        {
          targets: '> 1.0%, not dead',
          // 1% 이상의 시장 점유율을 가지는 브라우저에 대해 지원하겠다.
          // not dead : 보안 update를 하는 브라우저에 대해 지원하겠다. 
          'core-js': 3,
          // polyfill은 core-js를 사용하겠다.
          useBuiltIns: 'usage',
          // 모든 polyfill을 가져오는게 아니라 필요한 Polyfill를 import해서 사용하겠다.
          modules: true,
          // ES6의 module syntax를 지원하겠다.
        },
      ],
    ];
  
    return {
      presets,
    };
  };