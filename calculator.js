const express= require("express");
const res = require("express/lib/response");
const app= express();
const fs = require('fs');
const winston = require('winston');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculate-service' },
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });
  
  //
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  //
  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }
const add= (n1,n2) => {
    return n1+n2;
}
app.get("/add", (req,res)=>{
    try{
    const n1= parseFloat(req.query.n1);
    const n2=parseFloat(req.query.n2);
    if(isNaN(n1)) {
        logger.error("n1 is incorrectly defined");
        throw new Error("n1 incorrectly defined");
    }
    if(isNaN(n2)) {
        logger.error("n2 is incorrectly defined");
        throw new Error("n2 incorrectly defined");
    }
    
    logger.info('Parameters '+n1+' and '+n2+' received for addition');
    const result = add(n1,n2);
    res.status(200).json({statuscocde:200, data: result }); 
    } catch(error) { 
        console.error(error)
        res.status(500).json({statuscocde:500, msg: error.toString() })
      }
});
const sub= (n1,n2) => {
  return n1-n2;
}
app.get("/sub", (req,res)=>{
  try{
  const n1= parseFloat(req.query.n1);
  const n2=parseFloat(req.query.n2);
  if(isNaN(n1)) {
      logger.error("n1 is incorrectly defined");
      throw new Error("n1 incorrectly defined");
  }
  if(isNaN(n2)) {
      logger.error("n2 is incorrectly defined");
      throw new Error("n2 incorrectly defined");
  }
  
  logger.info('Parameters '+n1+' and '+n2+' received for subtract');
  const result = sub(n1,n2);
  res.status(200).json({statuscocde:200, data: result }); 
  } catch(error) { 
      console.error(error)
      res.status(500).json({statuscocde:500, msg: error.toString() })
    }
});
const mul= (n1,n2) => {
  return n1*n2;
}
app.get("/mul", (req,res)=>{
  try{
  const n1= parseFloat(req.query.n1);
  const n2=parseFloat(req.query.n2);
  if(isNaN(n1)) {
      logger.error("n1 is incorrectly defined");
      throw new Error("n1 incorrectly defined");
  }
  if(isNaN(n2)) {
      logger.error("n2 is incorrectly defined");
      throw new Error("n2 incorrectly defined");
  }
  
  logger.info('Parameters '+n1+' and '+n2+' received for multiply');
  const result = mul(n1,n2);
  res.status(200).json({statuscocde:200, data: result }); 
  } catch(error) { 
      console.error(error)
      res.status(500).json({statuscocde:500, msg: error.toString() })
    }
});

const div= (n1,n2) => {
    if (n2 === 0) {
        throw new Error("Division by zero is not allowed");
    }
  return n1/n2;
}

app.get("/div", (req,res)=>{
  try{
  const n1= parseFloat(req.query.n1);
  const n2=parseFloat(req.query.n2);
  if(isNaN(n1)) {
      logger.error("n1 is incorrectly defined");
      throw new Error("n1 incorrectly defined");
  }
  if(isNaN(n2)) {
      logger.error("n2 is incorrectly defined");
      throw new Error("n2 incorrectly defined");
  }
  
  logger.info('Parameters '+n1+' and '+n2+' received for divide');
  const result = div(n1,n2);
  res.status(200).json({statuscocde:200, data: result }); 
  } catch(error) { 
      console.error(error)
      res.status(500).json({statuscocde:500, msg: error.toString() })
    }
});

const exp = (base, exponent) => {
    return Math.pow(base, exponent);
}
app.get("/exp", (req, res) => {
    try {
        const base = parseFloat(req.query.base);
        const exponent = parseFloat(req.query.exponent);
        if (isNaN(base) || isNaN(exponent)) {
            logger.error("Invalid parameters for exponentiation");
            throw new Error("Invalid parameters for exponentiation");
        }
        logger.info('Parameters ' + base + ' and ' + exponent + ' received for exponentiation');
        const result = exp(base, exponent);
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ statuscode: 500, msg: error.toString() });
    }
});

const sqrt = (number) => {
    if (number < 0) {
        throw new Error("Square root of a negative number is not allowed");
    }
    return Math.sqrt(number);
}


app.get("/sqrt", (req, res) => {
    try {
        const number = parseFloat(req.query.number);
        if (isNaN(number)) {
            logger.error("Invalid parameter for square root");
            throw new Error("Invalid parameter for square root");
        }
        logger.info('Parameter ' + number + ' received for square root');
        const result = sqrt(number);
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ statuscode: 500, msg: error.toString() });
    }
});

const mod = (dividend, divisor) => {
    if (divisor === 0) {
        throw new Error("Division by zero is not allowed for modulo operation");
    }
    return dividend % divisor;
}

app.get("/mod", (req, res) => {
    try {
        const dividend = parseFloat(req.query.dividend);
        const divisor = parseFloat(req.query.divisor);
        if (isNaN(dividend) || isNaN(divisor) || divisor === 0) {
            logger.error("Invalid parameters for modulo operation");
            throw new Error("Invalid parameters for modulo operation");
        }
        logger.info('Parameters ' + dividend + ' and ' + divisor + ' received for modulo operation');
        const result = mod(dividend, divisor);
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ statuscode: 500, msg: error.toString() });
    }
});

const port=3040;
app.listen(port,()=> {
    console.log("hello i'm listening to port"+port);
})
