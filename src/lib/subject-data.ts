// Subject data for different exam boards
// This file imports data from separate exam board files

export type { Topic, Paper, Subject, ExamBoard } from '../data/types';

import { aqa } from '../data/aqa';
import { edexcel } from '../data/edexcel';
import { ocr } from '../data/ocr';
import type { ExamBoard, Subject, Topic, Paper } from '../data/types';

export const examBoards: ExamBoard[] = [
  aqa,
  edexcel,
  ocr
];

// Helper function to get all subjects across all exam boards
export const getAllSubjects = (): Subject[] => {
  const subjectsMap = new Map<string, Subject>();
  
  examBoards.forEach(board => {
    board.subjects.forEach((subject: Subject) => {
      // For tiered subjects, use the base subject name without tier
      const baseSubjectId = subject.id.replace(/-higher$|-foundation$/, '');
      const baseSubjectName = subject.name.replace(/\s*\([^)]*\)$/, ''); // Remove tier info from name
      
      if (!subjectsMap.has(baseSubjectId)) {
        subjectsMap.set(baseSubjectId, {
          ...subject,
          id: baseSubjectId,
          name: baseSubjectName
        });
      }
    });
  });
  
  return Array.from(subjectsMap.values());
};

// Helper function to get subjects for a specific exam board
export const getSubjectsByExamBoard = (examBoardId: string): Subject[] => {
  const board = examBoards.find(board => board.id === examBoardId);
  return board ? board.subjects : [];
};

// Helper function to get topics for a specific subject and exam board
export const getTopicsBySubjectAndBoard = (examBoardId: string, subjectId: string): Topic[] => {
  const board = examBoards.find(board => board.id === examBoardId);
  if (!board) return [];
  
  const subject = board.subjects.find((subject: Subject) => subject.id === subjectId);
  return subject ? subject.papers.flatMap(paper => paper.topics) : [];
};

// Helper function to get papers for a specific subject and exam board
export const getPapersBySubjectAndBoard = (examBoardId: string, subjectId: string): Paper[] => {
  const board = examBoards.find(board => board.id === examBoardId);
  if (!board) return [];
  
  const subject = board.subjects.find((subject: Subject) => subject.id === subjectId);
  return subject ? subject.papers : [];
};

// Helper function to get available exam boards for a specific subject
export const getExamBoardsForSubject = (subjectId: string): ExamBoard[] => {
  return examBoards.filter(board => {
    return board.subjects.some(subject => {
      // Check if subject matches (including tiered subjects)
      const baseSubjectId = subject.id.replace(/-higher$|-foundation$/, '');
      return baseSubjectId === subjectId;
    });
  });
};

// Helper function to get the proper subject name from a subject ID
export const getSubjectNameFromId = (subjectId: string, examBoardId: string): string => {
  const board = examBoards.find(board => board.id === examBoardId);
  if (!board) return subjectId;
  
  const subject = board.subjects.find((subject: Subject) => subject.id === subjectId);
  return subject ? subject.name : subjectId;
};
