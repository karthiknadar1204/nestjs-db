import { Injectable } from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
@Injectable()
export class EvService {
    constructor(private configureService: ConfigService){}

    getDbUrl(){
        // Try multiple possible variable names
        const dbUrl = 
            this.configureService.get<string>('DATABASE_URL') ||
            this.configureService.get<string>('DB_URL') ||
            this.configureService.get<string>('dburl') ||
            this.configureService.get<string>('DBURL');
        
        if (!dbUrl) {
            // Debug: Show all environment variables that contain 'DB' or 'DATABASE'
            const allEnvVars = process.env;
            const dbRelatedVars = Object.keys(allEnvVars)
                .filter(key => key.toUpperCase().includes('DB') || key.toUpperCase().includes('DATABASE'))
                .reduce((acc, key) => {
                    const value = allEnvVars[key];
                    if (value) {
                        acc[key] = value;
                    }
                    return acc;
                }, {} as Record<string, string>);
            
            return {
                error: 'DATABASE_URL not found',
                message: 'Please check your .env file. Looking for: DATABASE_URL, DB_URL, dburl, or DBURL',
                availableDbVars: dbRelatedVars,
                allEnvKeys: Object.keys(allEnvVars).filter(key => key.includes('DB') || key.includes('DATABASE'))
            };
        }
        
        return { DATABASE_URL: dbUrl };
    }
}