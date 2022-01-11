// 1.2 Create Test Script loop to find "SKU0005" and print the value in log console or a file with the format
const sampleResponse = [
    {
        "qty": "0",
        "sku": "SKU0001",
        "updatedTime": "2021-08-05T10:20:12.053457Z"
    },
    {
        "qty": "0",
        "sku": "SKU0002",
        "updatedTime": "2021-08-05T10:20:12.093643Z"
    },
    {
        "qty": "0",
        "sku": "SKU0003",
        "updatedTime": "2021-08-05T10:20:12.121762Z"
    },
    {
        "qty": "0",
        "sku": "SKU0004",
        "updatedTime": "2021-08-05T10:20:12.150911Z"
    },
    {
        "qty": "0",
        "sku": "SKU0005",
        "updatedTime": "2021-08-05T10:20:12.180933Z"
    }
]


for (let index = 0; index < sampleResponse.length; index++) {
    const element = sampleResponse[index];
    if (element.sku == 'SKU0005') {

        // Convert the property name of retunred element match with expected column name.
        let formatedElement = {
            SKU: element.sku,
            Qty: element.qty,
            updatedTime: element.updatedTime
        }
        console.table([formatedElement], ["SKU", "Qty", "updatedTime"]);
    }
}

