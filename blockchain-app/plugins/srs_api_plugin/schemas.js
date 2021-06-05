const baseAssetSchema = {
    $id: 'lisk/base-transaction', 
    type: 'object', 
    required: ['moduleID', 'assetID', 'nonce', 'fee', 'senderPublicKey', 'asset'], 
    properties: {
        moduleID: {
            dataType: 'uint32', 
            fieldNumber: 1, 
        }, 
        assetID: {
            dataType: 'uint32', 
            fieldNumber: 2,
        }, 
        nonce: {
            dataType: 'uint64', 
            fieldNumber: 3, 
        }, 
        fee: {
            dataType: 'uint64', 
            fieldNumber: 4, 
        }, 
        senderPublicKey: {
            dataType: 'bytes', 
            fieldNumber: 5,
        }, 
        asset: {
            dataType: 'bytes', 
            fieldNumber: 6, 
        }, 
        signatures: {
            type: 'array', 
            items: {
                dataType: 'bytes',
            },
            fieldNumber: 7,
        },
    },
};

const createRecoverySchema = {
    $id: 'srs/recovery/create', 
    type: 'object', 
    required: ['friends', 'recoveryThreshold', 'delayPeriod'], 
    properties: {
        friends: {
            type: 'array', 
            fieldNumber: 1, 
            items: {
                type: 'bytes',
            },
        },
        recoveryThreshold: {
            dataType: 'uint32', 
            fieldNumber: 2,
        }, 
        delayPeriod: {
            dataType: 'uint32', 
            fieldNumber: 3,
        },
    },
};

const tokenTransferSchema = {
    $id: 'lisk/transfer-ass',
    title: 'Transfer transaction asset', 
    type: 'object', 
    required: ['amount', 'recipientAddress', 'data'], 
    properties: {
        amount: {
            dataType: 'uint64', 
            fieldNumber: 1,
        }, 
        recipientAddress: {
            dataType: 'bytes', 
            fieldNumber: 2, 
            minLength: 20, 
            maxLength: 20,
        },
        data: {
            dataType: 'string', 
            fieldNumber: 3, 
            minLength: 0, 
            maxLength: 64,
        },
    },
};

const initiateRecoverySchema = {
    $id: 'srs/recovery/initiate', 
    type: 'object', 
    required: ['lostAccount'], 
    properties: {
        lostAccount: {
            dataType: 'bytes', 
            fieldNumber: 1,
        },
    } ,
};

const vouchRecoverySchema = {
    $id: 'srs/recovery/vouch', 
    type: 'object', 
    required: ['lostAccount', 'rescuer'], 
    properties: {
        rescuer: {
            dataType: 'bytes', 
            fieldNumber: 1,
        }, 
        lostAccount: {
            dataType: 'bytes', 
            fieldNumber: 2,
        },
    },
};

const claimRecoverySchema = {
    $id: 'srs/recovery/claim', 
    type: 'object', 
    required: ['totalAccount'], 
    properties: {
        lostAccount: {
            dataType: 'bytes', 
            fieldNumber: 1
        },
    },
};

const closeRecoverySchema = {
    $id: 'srs/recovery/close',
    type: 'object', 
    required: ['rescuer'], 
    properties: {
        rescuer: {
            dataType: 'bytes', 
            fieldNumber: 1,
        },
    },
};

const removeRecoverySchema = {
    $id: 'srs/recovery/remove', 
    type: 'object', 
    required: ['lostAccount'], 
    properties: {
        lostAccount: {
            dataType: 'bytes', 
            fieldNumber: 1,
        },
    },
};

module.exports = {
    baseAssetSchema, 
    createRecoverySchema, 
    tokenTransferSchema, 
    initiateRecoverySchema,
    vouchRecoverySchema, 
    closeRecoverySchema, 
    claimRecoverySchema, 
    removeRecoverySchema,
};
