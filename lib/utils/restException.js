
class PlivoRestError extends Error {
  constructor(response) {
    response = response.response
    super('[HTTP ' + response.status + '] Failed to execute request');
    const body = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
    this.status = response.status;
    this.statusText = response.statusText
    this.message = body.error;
    this.apiID = body.api_id;
    this.moreInfo = response.config.data
  }
}

module.exports = PlivoRestError;
