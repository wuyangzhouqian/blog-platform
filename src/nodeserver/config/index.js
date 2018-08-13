import extend from 'lodash/extend';
import path from 'path';

let config = {
    'viewDir': path.join(__dirname,'../views'),
    'staticDir':path.join(__dirname,'../assets'),
};

const init = () => {
    if (process.env.NODE_ENV === 'development') {
        const localConfig = {
            port: 8090,
        };
        config = extend(config, localConfig);
    }

    if (process.env.NODE_ENV === 'production') {
        const proConfig = {
            port: 80,
        };
        config = extend(config, proConfig);
    }
    return config;
};

const result = init();

export default result;