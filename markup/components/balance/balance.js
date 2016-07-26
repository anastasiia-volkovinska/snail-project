let balance = (function () {

    let balanceContainer;

    let coinsSteps;
    let coinsValue;
    let coinsValueText;
    let coinsSum;
    let coinsSumText;
    let coinsCash;
    let coinsCashText;

    let betSteps;
    let betValue;
    let betValueText;
    let betSum;
    let betSumText;
    let betCash;
    let betCashText;

    let winCash;
    let winCashText;
    let currency;
    let currencyText;

    let parameters = {
        font: 'bold 20px Arial',
        color: '#dddddd',
        coinsValue: {
            x: 50,
            y: 50,
            textAlign: 'center',
            name: 'coinsValue'
        },
        coinsSum: {
            x: 295,
            y: 630,
            textAlign: 'center',
            font: 'bold 25px Arial',
            name: 'coinsSum'
        },
        coinsCash: {
            x: 470,
            y: 690,
            textAlign: 'center',
            name: 'coinsCash'
        },
        betValue: {
            x: 50,
            y: 50,
            textAlign: 'center',
            name: 'betValue'
        },
        betSum: {
            x: 1005,
            y: 630,
            textAlign: 'center',
            font: 'bold 25px Arial',
            name: 'betSum'
        },
        betCash: {
            x: 637,
            y: 690,
            textAlign: 'center',
            name: 'betCash'
        },
        winCash: {
            x: 810,
            y: 690,
            textAlign: 'center',
            name: 'winCash'
        },
        currency: {
            x: 50,
            y: 50,
            textAlign: 'center',
            name: 'currency'
        }
    };

    function initBalance(balanceData) {
        /* eslint-disable */
        init.promiseLines()
        /* eslint-enable */
            .then(arr => {
                let linesLength = arr.length;

                coinsSteps = balanceData.CoinValue;
                coinsValue = balanceData.CoinValue[0];
                coinsSum = balanceData.ScoreCoins;
                coinsCash = +(balanceData.ScoreCents / 100).toFixed(2);

                betSteps = balanceData.BetLevel;
                betValue = balanceData.BetLevel[0];
                betSum = +(betValue * linesLength).toFixed(0);
                betCash = +(betSum * coinsValue).toFixed(2);

                winCash = (0).toFixed(2);
                currency = balanceData.Currency;

                /* eslint-disable */
                writeBalance();
                /* eslint-enable */
            });
    }

    function writeBalance() {
        /* eslint-disable */
        coinsValueText = new createjs.Text(coinsValue, parameters.font, parameters.color).set(parameters.coinsValue);
        coinsSumText = new createjs.Text(coinsSum, parameters.font, parameters.color).set(parameters.coinsSum);
        coinsCashText = new createjs.Text(coinsCash, parameters.font, parameters.color).set(parameters.coinsCash);
        betValueText = new createjs.Text(betValue, parameters.font, parameters.color).set(parameters.betValue);
        betSumText = new createjs.Text(betSum, parameters.font, parameters.color).set(parameters.betSum);
        betCashText = new createjs.Text(betCash, parameters.font, parameters.color).set(parameters.betCash);
        winCashText = new createjs.Text(winCash, parameters.font, parameters.color).set(parameters.winCash);
        let stage = canvas.getStages().gameStaticStage;
        balanceContainer = new createjs.Container().set({
            name: 'balanceContainer'
        });
        balanceContainer.addChild(coinsSumText, coinsCashText, betSumText, betCashText, winCashText);
        stage.addChild(balanceContainer);
        stage.update();
        /* eslint-enable */
    }

    function updateBalance() {
        /* eslint-disable */
        if (coinsValueText.text !== coinsValue) coinsValueText.text = coinsValue;
        if (coinsSumText.text !== coinsSum) coinsSumText.text = coinsSum;
        if (coinsCashText.text !== coinsCash) coinsCashText.text = coinsCash;
        if (betValueText.text !== betValue) betValueText.text = betValue;
        if (betSumText.text !== betSum) betSumText.text = betSum;
        if (betCashText.text !== betCash) betCashText.text = betCash;
        if (winCashText.text !== winCash) winCashText.text = winCash;
        let stage = canvas.getStages().gameStaticStage;
        /* eslint-enable */
        stage.update();
    }

    function changeBet(moreOrLess, maxBet) {
        if (maxBet) {
            betValue = betSteps[betSteps.length - 1];
        } else if (moreOrLess === true && betValue !== betSteps[betSteps.length - 1]) {
            let i = betSteps.length;
            while (i >= 0) {
                if (betSteps[i] === betValue) {
                    betValue = betSteps[i + 1];
                    i = -1;
                }
                i--;
            }
        } else if (moreOrLess === false && betValue !== betSteps[0]) {
            let i = betSteps.length;
            while (i >= 0) {
                if (betSteps[i] === betValue) {
                    betValue = betSteps[i - 1];
                    i = -1;
                }
                i--;
            }
        } else {
            console.error('Bet change is failed!');
        }
        /* eslint-disable */
        init.promiseLines()
        /* eslint-enable */
            .then(arr => {
                let linesLength = arr.length;
                betSum = +(betValue * linesLength).toFixed(0);
                betCash = +(betSum * coinsValue).toFixed(2);
                updateBalance();
                console.log('Bet is changed:', betValue);
                if (betValue === betSteps[betSteps.length - 1]) {
                    console.error('This bet value is maximum!');
                    /* eslint-disable */
                    events.trigger('maxBet', false);
                    /* eslint-disable */
                } else if (betValue === betSteps[0]) {
                    console.error('This bet value is minimum!');
                    /* eslint-disable */
                    events.trigger('minBet', false);
                    /* eslint-disable */
                }
            });
    }

    function changeCoins(moreOrLess, maxBet) {
        if (maxBet) {
            coinsValue = coinsSteps[coinsSteps.length - 1];
        } else if (moreOrLess === true && coinsValue !== coinsSteps[coinsSteps.length - 1]) {
            let i = coinsSteps.length;
            while (i >= 0) {
                if (coinsSteps[i] === coinsValue) {
                    coinsValue = coinsSteps[i + 1];
                    i = -1;
                }
                i--;
            }
        } else if (moreOrLess === false && coinsValue !== coinsSteps[0]) {
            let i = coinsSteps.length;
            while (i >= 0) {
                if (coinsSteps[i] === coinsValue) {
                    coinsValue = coinsSteps[i - 1];
                    i = -1;
                }
                i--;
            }
        } else {
            console.error('Coins change is failed!');
        }
        coinsSum = +Math.floor(coinsCash / coinsValue).toFixed(0);
        betCash = +(coinsValue * betSum).toFixed(2);
        updateBalance();
        console.log('Coins value is changed:', coinsValue);
        if (coinsValue === coinsSteps[coinsSteps.length - 1]) {
            console.error('This coins value is maximum!');
            /* eslint-disable */
            events.trigger('maxCoins', false);
            /* eslint-disable */
        } else if (coinsValue === coinsSteps[0]) {
            console.error('This coins value is minimum!');
            /* eslint-disable */
            events.trigger('minCoins', false);
            /* eslint-disable */
        }
    }

    function spinStart() {
        if (coinsSum >= betSum) {
            coinsSum -= betSum;
            coinsCash = ((coinsCash * 100 - betCash * 100) / 100).toFixed(2);
            winCash = (0).toFixed(2);
            updateBalance();
        } else {
            console.error('Too low cash for spin!');
        }
        updateBalance();
    }

    function spinEnd(autoMode, scoreArray) {
        if (scoreArray[0] !== undefined) {
            winCash = (+scoreArray[0]).toFixed(2);
            coinsCash = (scoreArray[2] / 100).toFixed(2);
            coinsSum = scoreArray[1];
            updateBalance();
        } else {
            console.error('WinValue is undefined!');
        }
    }

    function getBalance() {
        if (betValue && coinsValue) {
            return {
                coinsSteps,
                coinsValue,
                coinsSum,
                coinsCash,
                betSteps,
                betValue,
                betSum,
                betCash,
                winCash,
                currency
            };
        } else {
            throw new Error('We have no balance.');
        }
    }

    /* eslint-disable */
    events.on('initBalance', initBalance);
    events.on('spinStart', spinStart);
    events.on('spinEnd', spinEnd);
    events.on('changeBet', changeBet);
    events.on('changeCoins', changeCoins);
    // Еще будут какие-то события от бонусов и фри-спинов
    /* eslint-enable */

    return {
        getBalance,
        changeBet,
        changeCoins,
    };
})();
