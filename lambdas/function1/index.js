exports.handler = async function(event, context) {
  
  return {
    statusCode: 200,
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      msg: 'This is a test from the lambda function 1'
    })
  };
}