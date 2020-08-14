/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import { Plugin } from 'rollup';
import * as babel from '@babel/core';

import { BABEL_CONFIG_BASE } from '../babel-plugins';
import { NormalizedOutputConfig } from '../options';

export default function ({ sourcemap }: NormalizedOutputConfig): Plugin {
    // Inlining the `babel-preset-compat` module require to only pay the parsing and evaluation cost for needed modules
    const presetCompat = require('babel-preset-compat');

    const config = {
        ...BABEL_CONFIG_BASE,
        presets: [[presetCompat, { proxy: true }]],
        sourceMaps: sourcemap,
    };

    return {
        name: 'lwc-compat',

        transform(src: string) {
            const result = babel.transformSync(src, config)!;
            return { code: result.code!, map: result.map };
        },
    };
}
