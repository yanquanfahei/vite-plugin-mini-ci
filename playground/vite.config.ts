import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import miniCI from '../src/index'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni(), miniCI({
    alipayOpt: {
      appId: '2021003139676331',
      openOpt: {
        appPath: 'D:\\mp-alipay\\小程序开发者工具'
      },
      authentication: {
        privateKey: 'MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCExEpq+gIw3TYktGDKfVTpLYU+SB9MvkHynJ01NdjHMY4sLpQvVeRG8IEpG4A6t5gQ9fNbRctRlpLk4EVQKNoyQ8JUDhXCEgeop5tGPO9w+pniVL+PZ7JCpmFJ0KJ5rVn5q+NSsLO7tCUXQ9jGMi6Gy+fpBXmmhF4+3R8W/BNzZIIkiKQ3Trx5p3xOFl7POFoxXFJ8lLSOypGqJ0REbNy5+biZYENWAhGwjTpM8Ixyev8bFDNm2gdul0JKAiLI/MCa7+xrysnNDCzgBl98+RC5ngE4dm3JIA0CqSN2Mmuvy/pCkf9rsG/vnK722/sukv1xI0Dq2ZORNcR7K+R9e55fAgMBAAECggEADlQk9/CthdqJ+mIhRBlMrbHE/JjKD/1Enst6SADcuXrGrkwEoCsz7NgOCIK4Tx37YnE453Pb4p1OkzcFJAaUrfIUKgAvJvfNLc2Q+36eFOJm8z9UQUTev0S3oUDMGDe2SzTa3tTFQQ/LJPyki5dk4BVnnQWDQI5uoXg538Aq1TwutsykclyVJMWSLz6br4T/lvnB7vx/eyZrQ6PgaIAO+gP1ww6cFGYUOunrjPa2OVkr+w0rOTus4EXH1kT5OqPh0HVlV6ujGtLQVu/7+IcjeHa8bp3gjwB/rjzQytYSurPFpj0sXnPVHVswILGxAdA1rntoRLojsWRWj0lL7T5uQQKBgQDLcC95XEQ+JgvY+/LEycCqQf5o7E8sMDYK8TgyLmBIAmV+vGhwIgg90wZOkqV+P05u+O2IFvAW4Sik0bXN0R+BJyEsf9cYY+xeKruGapna8TtYt6n6B0AQ0rhQnjfpNqY/o5Fla0UDW2uuScmgHCeSoHvWywnYZYiMCArveJZI4QKBgQCnEcCHS36fJEbNBeLH39+YoIYXSSvIJ+5O+0W3n62N8jct6ySFBhOAp9iOv+TM+eaf1WDSrTm+US55tV1ArWjCWolff5/EbpetDoj1yo8hh00XIqWcFPAjnK+HUcayE5GljkmCq4mW4f9c+Zeh/m7D7492kfPWZ8sw3NICpQqPPwKBgACWMTzbXEMFnxEgIOIaZtjW2eH5lHzfIrjDW1MhuRtcDmjgKDjykC2Fd0YwvBNyIUrGowC6eDTIr3JSPID8cmfP8hOLxtYGK79VxjasBgeQnIgz92SGMtQZl3h8DFM62h3i3d96ALfywou9ILy6eA6/Mbw716ptGIi22Tk5ks1hAoGAOHp01of7/zqZQLgLqTwSb5tcmUSgK2LsWgDx2Zh+aG0IoFpMlzetoiGbwO44H98fSssslyv+SEtTZcudAb9dmc5XgFQ5o4MrfVJblJPsfQ4rTnXk/HXLlI5kfF91xz98TjZivWzV747o7/pke1vzAAPdQN0oTEP8WcFcsY4vmqsCgYAC6yS9Srl0ugBKpCtPWVmvzNGB92jqDA+/xSeKGXSJDE8ydDXOqiNB6ZybsJsgGIgXVCdb4fF4zFdq52x+wCSi5goytPP2ALF3DeOs4Srv5pcQCGoACg+0fa/8SUqlAva76oJ2REdDUZPPAoE04qU3j5w2nSagyS7Sd+yTRfbisw==',
        toolId: 'c914d5ff14734a00be141c6b88cb9fbf'
      }
    }
  })]
})
