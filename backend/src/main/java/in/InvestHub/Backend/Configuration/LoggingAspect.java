package in.InvestHub.Backend.Configuration;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;


@Aspect
@Component
public class LoggingAspect {

    private void writeLogToFile(String logMessage) {
        try {
            File logFile = new File("log.txt"); // You can change the file name and location as needed.
            FileWriter fileWriter = new FileWriter(logFile, true); // 'true' to append to the file.

            fileWriter.write(logMessage + "\n");
            fileWriter.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Before("execution(* in.InvestHub.Backend.Services.*.*(..))")
    public void logMethodEntry(JoinPoint joinPoint) {
        String methodName = joinPoint.getSignature().getName();
        String logMessage = "Entering method: " + methodName;
        System.out.println(logMessage);
        writeLogToFile(logMessage);
    }

    @After("execution(* in.InvestHub.Backend.Services.*.*(..))")
    public void logMethodExit(JoinPoint joinPoint) {
        String methodName = joinPoint.getSignature().getName();
        String logMessage = "Exiting method: " + methodName;
        System.out.println(logMessage);
        writeLogToFile(logMessage);
    }

    @AfterThrowing(pointcut = "execution(* in.InvestHub.Backend.Services.*.*(..))", throwing = "ex")
    public void logMethodException(JoinPoint joinPoint, Exception ex) {
        String methodName = joinPoint.getSignature().getName();
        String logMessage = "Exception in method " + methodName + ": " + ex.getMessage();
        System.err.println(logMessage);
        writeLogToFile(logMessage);
    }
}

