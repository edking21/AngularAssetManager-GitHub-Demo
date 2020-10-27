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
                assetName:"Lawn Mower",
                assetCode:"LM-12999",
                category:"Lawn Tools",
                location:"Chesterfield",
                imageUrl:"image1",
                make:"make1",
                model:"model1",
                tags:"lawn tools",
                description: "Self Propelled Bagger",
                assetStatus: "Checked In"
            }
            ,{
                id: 3,
                assetName:"Rake",
                assetCode:"RK-5599",
                category:"Lawn Tools",
                location:"Chesterfield",
                imageUrl:"image1",
                make:"make1",
                model:"model1",
                tags:"lawn tools",
                description: "Finger Rake Wood Handle",
                assetStatus: "Checked In"
            }
            ,{
                id: 4,
                assetName:"Aerator",
                assetCode:"AR-3859",
                category:"Lawn Tools",
                location:"Chesterfield",
                imageUrl:"image1",
                make:"make1",
                model:"model1",
                tags:"lawn tools",
                description: "Manual Foot Step Aerator",
                assetStatus: "Checked In"
            }
            ,{
                id: 5,
                assetName:"Shovel",
                assetCode:"SH-45559",
                category:"Lawn Tools",
                location:"Chesterfield",
                imageUrl:"image1",
                make:"make1",
                model:"model1",
                tags:"lawn tools",
                description: "Spade Long Handle",
                assetStatus: "Checked In"
            }
            ,{
                id: 5,
                assetName:"Shovel",
                assetCode:"SH-45539",
                category:"Lawn Tools",
                location:"Chesterfield",
                imageUrl:"image1",
                make:"make1",
                model:"model1",
                tags:"lawn tools",
                description: "Spade Flat Edge",
                assetStatus: "Checked In"
            }
        ]
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