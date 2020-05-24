const Asset = require('./models/asset');

class FakeDbAsset
{
    constructor()
    {
        this.assets = [
            {
                id: 1,
                assetName:"Hand Trowel",
                assetCode:"GNN-999",
                category:"Lawn Tools",
                location:"Chesterfield",
                imageUrl:"image1",
                make:"make1",
                model:"model1",
                tags:"lawn tools",
                description: "Hand held shovel",
                assetStatus: "Checked In"
            },
            {
                id: 2,
                assetName:"Hand Trowel",
                assetCode:"GNN-999",
                category:"Lawn Tools",
                location:"Chesterfield",
                imageUrl:"image1",
                make:"make1",
                model:"model1",
                tags:"lawn tools",
                description: "Hand held shovel",
                assetStatus: "Checked In"
            },
            {
                id: 3,
                assetName:"Hand Trowel",
                assetCode:"GNN-999",
                category:"Lawn Tools",
                location:"Chesterfield",
                imageUrl:"image1",
                make:"make1",
                model:"model1",
                tags:"lawn tools",
                description: "Hand held shovel",
                assetStatus: "Checked In"
            }]
    }

    async cleanDb()
    {
        await Asset.remove({});
    }

    pushAssetsToDb()
    {
        this.assets.forEach((asset) => {
            
            const newAsset = new Asset(asset);

            newAsset.save();

        })
    }

    seedDb()
    {
        this.cleanDb();
        this.pushAssetsToDb();
    }

}

module.exports = FakeDbAsset;